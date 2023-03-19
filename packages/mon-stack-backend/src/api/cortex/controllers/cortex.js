const CortexService = require('../../../modules/cortex/cortex.service');
const CortexIntegrationWeb = require('../../../modules/cortex/cortex.integration.web');

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

  async talk(ctx) {
    const { authorization } = ctx.request.headers;
    if (!authorization) {
      ctx.status = 401;
      return {
        data: null,
        error: {
          status: 401,
          name: 'Unauthorized',
          message: 'Unauthorized access',
        },
      };
    }

    const { prompt } = ctx.request.body;
    const cortexIntegrationWeb = new CortexIntegrationWeb({
      prompt,
      token: authorization.replace('Bearer ', ''),
    });
    const { id, error } = cortexIntegrationWeb.init();
    if (error) {
      ctx.status = 401;
      return {
        data: null,
        error,
      };
    }

    const profile = await cortexIntegrationWeb.getUserProfile(id);
    const result = await cortexIntegrationWeb.onMessage({ prompt, profile });

    return { data: result };
  },
};
