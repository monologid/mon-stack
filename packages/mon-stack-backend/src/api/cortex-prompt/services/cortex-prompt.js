'use strict';

/**
 * cortex-prompt service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cortex-prompt.cortex-prompt');
