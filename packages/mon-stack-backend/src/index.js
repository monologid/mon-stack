'use strict';

const CortexBootStrap = require('./modules/cortex/cortex.bootstrap');
const GoogleBigQuery = require('./modules/integration/google.bigquery');
const IntegrationService = require('./modules/integration/integration.service');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    await new CortexBootStrap({ strapi }).init();
  },
};
