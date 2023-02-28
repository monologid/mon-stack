'use strict';

/**
 * cortex-intent router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::cortex-intent.cortex-intent');
