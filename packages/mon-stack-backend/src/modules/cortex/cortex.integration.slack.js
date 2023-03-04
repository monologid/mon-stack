const { App } = require('@slack/bolt');
const CortexService = require('./cortex.service');
const CortexOperation = require('./cortex.operation');

class CortexIntegrationSlack {
	constructor() {
		this.bot = new App({
			appToken: process.env.CORTEX_INTEGRATION_SLACK_APP_TOKEN,
			token: process.env.CORTEX_INTEGRATION_SLACK_BOT_TOKEN,
			signingSecret: process.env.CORTEX_INTEGRATION_SLACK_SIGNING_SECRET,
			socketMode: true,
			developerMode: false,
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
		this.bot.event('message', async ({ client, event, say }) => {
			const profile = await this.getUserProfile({ client, event });

			switch (event.type) {
				case 'message':
					await this.onMessage({ client, event, profile });
					break;
				default:
					await this.onMessage({ client, event, profile });
			}
		});
	}

	async getUserProfile({ client, event }) {
		const data = await client.users.info({ user: event.user, include_locale: false });
		const { email, display_name: user } = data.user.profile;
		return { email, user, channel: event.channel };
	}

	async onMessage({ client, event, profile }) {
		let cortexOperation = new CortexOperation({ userId: profile.channel, prompt: event.text, profile });
		await cortexOperation.init();

		const result = await cortexOperation.run({ platform: 'slack', userInput: event.text });
		switch (result.kind) {
			case 'api':
				break;
			case 'function':
				break;
			default:
				if (result.message)
					await client.chat.postMessage({
						channel: profile.channel,
						text: result.message,
					});
		}

		if (cortexOperation.isNextStep() && result.stepState !== 'waiting_input')
			await this.onMessage({ client, event, profile });
	}
}

module.exports = CortexIntegrationSlack;
