const CacheRedis = require('../cache/cache.redis');

class CortexIAM {
	constructor() {
		this.cache = new CacheRedis({ url: process.env.CORTEX_STATE_CACHE_REDIS_URL }).getClient();
		this.key = 'cortex:iam:roles';
	}

	async updateRolesInCache() {
		const iamRoles = await strapi.db.query('api::cortex-iam.cortex-iam').findMany({ where: {} });

		let roles = [];
		let rolePermissions = {};
		iamRoles.forEach((item) => {
			if (roles.indexOf(item.role) < 0) roles.push(item.role);
			if (!rolePermissions[item.role]) rolePermissions[item.role] = item.permission;
		});

		await this.cache.set(this.key, JSON.stringify({ roles, rolePermissions }));
		return { roles, rolePermissions };
	}

	async getRoles() {
		const result = await this.cache.get(this.key);
		if (result) return { ...JSON.parse(result) };

		const { roles, rolePermissions } = await this.updateRolesInCache();
		return { roles, rolePermissions };
	}

	async authorize({ userRoles, intent }) {
		const { roles, rolePermissions } = await this.getRoles();

		userRoles = userRoles.filter((role) => roles.includes(role));
		if (userRoles.length == 0) return false;

		let hasPermission = userRoles.some((role) => rolePermissions[role].includes('*'));
		if (hasPermission) return true;

		return userRoles.some((role) => rolePermissions[role].includes(intent));
	}
}

module.exports = CortexIAM;
