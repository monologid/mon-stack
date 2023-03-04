const { Telegraf } = require('telegraf');
const CortexOperation = require('./cortex.operation');

class CortexIntegrationTelegram {
	constructor() {
		const token = process.env.CORTEX_INTEGRATION_TELEGRAM_BOT_TOKEN || '';

		this.bot = new Telegraf(token);
	}

	async init() {
		this.startEventListener();
		await this.bot.launch();
		process.once('SIGINT', () => this.bot.stop('SIGINT'));
		process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
	}

	startEventListener() {
		this.bot.on('text', async (ctx) => {
			const profile = this.getUserProfile({ ctx });
			await this.onMessage({ ctx, profile });
		});
	}

	getUserProfile({ ctx }) {
		const { id, first_name: firstName, username, language_code: language } = ctx.message.from;
		return { id, firstName, username, language };
	}

	async onMessage({ ctx, profile }) {
		let cortexOperation = new CortexOperation({ userId: profile.id, prompt: ctx.message.text, profile });
		await cortexOperation.init();

		const result = await cortexOperation.run({ platform: 'telegram', userInput: ctx.message.text });
		switch (result.kind) {
			case 'api':
				break;
			case 'function':
				break;
			default:
				if (result.message) await ctx.reply(result.message);
		}

		if (cortexOperation.isNextStep() && result.stepState !== 'waiting_input') {
			await this.onMessage({ ctx, profile });
		}
	}
}

module.exports = CortexIntegrationTelegram;
