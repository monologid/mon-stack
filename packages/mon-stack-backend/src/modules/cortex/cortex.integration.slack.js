const { App } = require('@slack/bolt');
const fetch = require('cross-fetch');
const CortexService = require('./cortex.service');

let conversation = {};

class CortexIntegrationSlack {
	constructor() {
		this.bot = new App({
			appToken: process.env.CORTEX_INTEGRATION_SLACK_APP_TOKEN,
			token: process.env.CORTEX_INTEGRATION_SLACK_BOT_TOKEN,
			signingSecret: process.env.CORTEX_INTEGRATION_SLACK_SIGNING_SECRET,
			socketMode: true,
		});

		this.cortex = new CortexService();
	}

	init() {
		this.startEventListener();
		this.bot.start().catch((error) => {
			console.log(error);
		});
	}

	startEventListener() {
		this.bot.event('message', async ({ client, event }) => {
			switch (event.type) {
				case 'message':
					await this.onMessage({ client, event });
					break;
				default:
					await this.onMessage({ client, event });
			}
		});
	}

	async getUserProfile({ client, event }) {
		const data = await client.users.info({ user: event.user, include_locale: false });
		const { email, display_name: user } = data.user.profile;
		return { email, user, channel: event.channel };
	}

	async onMessage({ client, event }) {
		const context = await this.cortex.getContext({ prompt: event.text });
		const { intent } = context;

		const workflow = await strapi.db
			.query('api::cortex-workflow.cortex-workflow')
			.findOne({ where: { intent } });
		const { operation } = workflow;

		await this.executeOperation({ client, event, context, operation });
	}

	async executeOperation({ client, event, context, operation }) {
		const profile = await this.getUserProfile({ client, event });
		const { classifications, entities, intent } = context;

		if (!conversation[profile.user])
			conversation[profile.user] = {
				index: 0,
				operation,
				operationResult: {},
			};

		let c = conversation[profile.user];
		let { id, kind, data } = operation[c.index];

		let message = '';

		// TODO: handle input from user
		switch (kind) {
			case 'message':
				message = data.message;
				for (let key in profile) message = message.replaceAll(`{{${key}}}`, profile[key]);
				for (let key in c.operationResult) message = message.replaceAll(`{{${key}}}`, c.operationResult[key]);
				c.operationResult[id] = await client.chat.postMessage({ channel: profile.channel, text: message });

				c.index = c.index + 1;
				if (operation[c.index]) await this.executeOperation({ client, event, context, operation });
				break;
			case 'api':
				// TODO: need to handle input based on context.entities
				c.operationResult[id] = await fetch(data.url, {
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

				c.index = c.index + 1;
				if (operation[c.index]) await this.executeOperation({ client, event, context, operation });
				break;
			case 'function':
				const { slack } = data;
				const fn = new Function(`return ${slack}`)();
				c.operationResult[id] = await fn({ result: c.operationResult, context, require });

				c.index = c.index + 1;
				if (operation[c.index]) await this.executeOperation({ client, event, context, operation });
				break;
			default:
				console.dir(c.operationResult);
				await client.chat.postMessage({ channel: profile.channel, text: 'end message =9' });
		}
	}
}

module.exports = CortexIntegrationSlack;
