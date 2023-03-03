const CacheRedis = require('../cache/cache.redis');

class CortexState {
	constructor() {
		this.key = process.env.CORTEX_STATE_CACHE_PREFIX || 'mon-stack-backend';
		this.cache = new CacheRedis({ url: process.env.CORTEX_STATE_CACHE_REDIS_URL }).getClient();
	}

	generateId(id) {
		return `${this.key}:${id}`;
	}

	async get(id) {
		const result = await this.cache.get(this.generateId(id));
		return result ? JSON.parse(result) : null;
	}

	async set(id, value) {
		await this.cache.set(
			this.generateId(id),
			JSON.stringify({
				...(await this.get(this.generateId(id))),
				...value,
			})
		);
	}
}

module.exports = CortexState;
