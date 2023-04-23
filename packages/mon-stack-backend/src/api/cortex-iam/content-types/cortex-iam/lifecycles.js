const CacheRedis = require("../../../../modules/cache/cache.redis");

module.exports = {
  async afterUpdate(event) {
    const cache = new CacheRedis({ url: process.env.CORTEX_STATE_CACHE_REDIS_URL }).getClient();
    cache.del(`cortex:iam:roles`);
  }
}
