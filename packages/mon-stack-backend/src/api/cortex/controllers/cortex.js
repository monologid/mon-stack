const CortexService = require('../../../modules/cortex/cortex.service');

module.exports = {
	async classify(ctx) {
		const cortex = new CortexService();
		const context = await cortex.getContext(ctx.query);
		return { data: { context } };
	},

	async workflow(ctx) {
		const { intent } = ctx.query;
		const workflow = await strapi.db
			.query('api::cortex-workflow.cortex-workflow')
			.findOne({ where: { intent } });

		if (!workflow) {
			ctx.status = 404;
			return {
				data: null,
				error: {
					status: 404,
					name: 'NotFound',
					message: 'Invalid intent',
				},
			};
		}

		return { data: { workflow } };
	},
};
