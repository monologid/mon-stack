const CortexService = require('./cortex.service');
const CortexIntegrationSlack = require('./cortex.integration.slack');
const CortexIntegrationTelegram = require('./cortex.integration.telegram');
const CortexIntegrationWhatsapp = require('./cortex.integration.whatsapp');

class CortexBootstrap {
  constructor({ strapi }) {
    this.strapi = strapi;
  }

  async init() {
    if (process.env.CORTEX_ENABLED === 'true') await this.train();
    if (process.env.CORTEX_SCHEDULER_ENABLED === 'true') await this.scheduler();

    if (process.env.CORTEX_INTEGRATION_SLACK_ENABLED === 'true') new CortexIntegrationSlack().init();
    if (process.env.CORTEX_INTEGRATION_TELEGRAM_ENABLED === 'true') new CortexIntegrationTelegram().init();
    if (process.env.CORTEX_INTEGRATION_WHATSAPP_ENABLED === 'true') new CortexIntegrationWhatsapp().init();
  }

  async scheduler() {
    const interval = process.env.CORTEX_SCHEDULER_INTERVAL
      ? parseInt(process.env.CORTEX_SCHEDULER_INTERVAL)
      : 30000;
    setInterval(async () => {
      await this.train();
    }, interval);
  }

  async train() {
    const cortex = new CortexService();
    const prompts = await this.strapi.db
      .query('api::cortex-prompt.cortex-prompt')
      .findMany({ where: {}, populate: ['intent'] });
    prompts.forEach((data) => {
      cortex.addContext({ intent: data.intent.intent, ...data });
    });
    await cortex.train();
  }
}

module.exports = CortexBootstrap;
