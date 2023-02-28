'use strict';

/**
 * cortex-workflow service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cortex-workflow.cortex-workflow');
