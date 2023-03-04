'use strict';

/**
 * cortex-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cortex-user.cortex-user');
