'use strict';

/**
 * service-provider router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::service-provider.service-provider');
