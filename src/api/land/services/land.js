'use strict';

/**
 * land service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::land.land');
