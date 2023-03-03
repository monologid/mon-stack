const { Redis } = require('ioredis');

class CacheRedis {
	constructor({ url }) {
		this.client = new Redis(url);
	}

	getClient() {
		return this.client;
	}
}

module.exports = CacheRedis;
