'use strict';

/**
 * service-provider service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::service-provider.service-provider');
