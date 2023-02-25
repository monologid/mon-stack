import Cortex from '../../../../services/cortex';

export default {
	async afterCreate(event) {
		const { intent, prompt, language }: any = event.params.data;
		const cortex: Cortex = new Cortex();
		await cortex.addContext(intent, prompt, language);
		await cortex.train();
	},
};
