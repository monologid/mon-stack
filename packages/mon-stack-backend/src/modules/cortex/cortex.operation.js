const CortexState = require('./cortex.state');
const fetch = require('cross-fetch');
const CortexService = require('./cortex.service');

class CortexOperation {
	constructor({ userId, context, operation, prompt }) {
		this.state = new CortexState();
		this.userId = userId;
		this.userState = {};
		this.context = context;
		this.operation = operation;
		this.prompt = prompt;
	}

	async init() {
		this.userState = await this.state.get(this.userId);

		if (this.userState && this.userState.context && this.userState.context.intent) {
			this.context = this.userState.context;
			this.operation = this.userState.operation;
			return;
		}

		if (!this.userState || (this.userState && !this.userState.index)) {
			const context = await new CortexService().getContext({ prompt: this.prompt });
			const intent = context && context.intent ? context.intent : null;

			const workflow = await strapi.db
				.query('api::cortex-workflow.cortex-workflow')
				.findOne({ where: { intent } });
			const operation = workflow && workflow.operation ? workflow.operation : null;

			const data = {
				index: 0,
				context,
				operation,
				operationResult: {},
				payload: {},
				stepState: 'none',
			};

			this.userState = data;
			this.context = context;
			this.operation = operation;

			await this.state.set(this.userId, data);
		}
	}

	async updateUserState(state) {
		const newState = state ? { ...this.userState, ...state } : null;
		await this.state.set(this.userId, newState);
		this.userState = await this.state.get(this.userId);
	}

	isNextStep() {
		if (!this.userState.index) return false;
		return this.userState.operation[this.userState.index] ? true : false;
	}

	async run({ platform, userInput }) {
		if (!this.operation || (this.operation && !this.operation[this.userState.index])) {
			await this.updateUserState(null);
			return {
				...this.userState,
				kind: 'error',
				message: "so sorry, it seems i don't understand the context, please ask Peter Parker to teach me :)",
			};
		}

		const { id: operationId, kind, data } = this.operation[this.userState.index];

		let message = data && data.message ? data.message : '';
		for (let key in this.userState.operationResult) {
			if (message) message = message.replaceAll(`{{${key}}}`, this.userState.operationResult[key]);
		}
		for (let key in this.userState.payload) {
			if (message) message = message.replaceAll(`{{${key}}}`, this.userState.payload[key]);
		}

		let result = null;
		let returnObj = {};
		switch (kind) {
			case 'api':
				result = await fetch(data.url, {
					...data,
					body: JSON.stringify({ ...data.body }),
				})
					.then(async (res) => {
						let response = await res.json();
						if (response.error) return { data: null, error: response.error };
						return { ...response, error: null };
					})
					.catch((error) => {
						return { error };
					});

				await this.updateUserState({
					index: this.userState.index + 1,
					operationResult: {
						...this.userState.operationResult,
						[operationId]: result,
					},
				});

				returnObj = { ...this.userState, kind };
				break;
			case 'end':
				await this.updateUserState(null);

				returnObj = {
					...this.userState,
					kind,
					message:
						message.length != 0
							? message
							: 'I hope my response was helpful and provided the information you needed :)',
				};
				break;
			case 'function':
				const stringFn = data[platform];
				const fn = new Function(`return ${stringFn}`)();
				result = await fn({
					result: this.userState.operationResult,
					payload: this.userState.payload,
					context: this.userState.context,
					require,
				});

				await this.updateUserState({
					index: this.userState.index + 1,
					operationResult: {
						...this.userState.operationResult,
						[operationId]: result,
					},
				});

				returnObj = { ...this.userState, kind };
				break;
			case 'input':
				if (this.userState.stepState === 'none') {
					await this.updateUserState({ stepState: 'waiting_input' });
					returnObj = { ...this.userState, kind, message };
				} else if (this.userState.stepState === 'waiting_input') {
					await this.updateUserState({
						index: this.userState.index + 1,
						payload: {
							...this.userState.payload,
							[operationId]: userInput,
						},
						stepState: 'none',
					});

					returnObj = { ...this.userState, kind };
				}
				break;
			case 'message':
				await this.updateUserState({ index: this.userState.index + 1 });
				returnObj = { ...this.userState, kind, message };
				break;
			default:
				returnObj = { ...this.userState, kind };
		}

		return returnObj;
	}
}

module.exports = CortexOperation;
