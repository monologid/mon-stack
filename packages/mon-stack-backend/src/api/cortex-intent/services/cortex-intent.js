'use strict';

/**
 * cortex-intent service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cortex-intent.cortex-intent');
