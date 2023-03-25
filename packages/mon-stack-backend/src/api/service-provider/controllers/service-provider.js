'use strict';

/**
 * service-provider controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::service-provider.service-provider');
