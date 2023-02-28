const { Telegraf } = require('telegraf');

class CortexIntegrationTelegram {
	constructor() {
		const token = process.env.CORTEX_INTEGRATION_TELEGRAM_BOT_TOKEN || '';

		this.bot = new Telegraf(token);
	}

	init() {
		this.startEventListener();
		this.bot.launch().then(null);
		process.once('SIGINT', () => this.bot.stop('SIGINT'));
		process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
	}

	startEventListener() {
		this.bot.on('text', async (ctx) => {
			await ctx.reply('hello world');
		});
	}
}

module.exports = CortexIntegrationTelegram;
