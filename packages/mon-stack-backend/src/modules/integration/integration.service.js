const GoogleIntegrations = require('./google');

class IntegrationService {
  constructor({ serviceProviderId }) {
    this.serviceProviderId = serviceProviderId;

    this.provider = null;
    this.service = null;
    this.environment = null;
    this.credential = null;
    this.metadata = null;

    this.error = false;
  }

  isError() {
    return this.error;
  }

  async init() {
    const data = await strapi.db
      .query('api::service-provider.service-provider')
      .findOne({ where: { id: this.serviceProviderId } });
    if (!data) return;

    try {
      const { provider, service, environment, credential, metadata } = data;
      switch (provider) {
        case 'google':
          this.credential = JSON.parse(Buffer.from(credential, 'base64').toString('utf-8'));
          break;
        default:
          this.credential = credential;
      }

      this.provider = provider;
      this.service = service;
      this.environment = environment;
      this.metadata = metadata;
    } catch (e) {
      this.error = true;
    }

    return this;
  }

  async execute(payload) {
    let opts = {
      credential: this.credential,
      ...payload,
    };

    switch (this.provider) {
      case 'google':
        return await new GoogleIntegrations[this.service](opts).run();
      default:
        return { error: 'Unknown service provider.' };
    }
  }
}

module.exports = IntegrationService;
