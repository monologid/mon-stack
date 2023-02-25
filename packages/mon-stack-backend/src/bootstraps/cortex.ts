import Cortex from '../services/cortex';

export default class CortexBootstrap {
	constructor() {}

	async init() {
		const { CORTEX_ENABLED, CORTEX_SCHEDULER_ENABLED }: any = process.env;
		if (CORTEX_ENABLED && CORTEX_ENABLED === 'true') await this.trainContext();
		if (CORTEX_SCHEDULER_ENABLED && CORTEX_SCHEDULER_ENABLED === 'true') await this.schedulerTrainContext();
	}

	async trainContext() {
		const cortex: Cortex = new Cortex();
		const prompts: any = await strapi.db
			.query('api::cortex-prompt.cortex-prompt')
			.findMany({ where: {}, populate: ['intent'] });
		prompts.forEach((data: any) => {
			cortex.addContext(data.intent.intent, data.prompt, data.language);
		});
		await cortex.train();
	}

	async schedulerTrainContext() {
		setInterval(async () => {
			await this.trainContext();
		}, parseInt(process.env.CORTEX_SCHEDULER_INTERVAL));
	}
}
