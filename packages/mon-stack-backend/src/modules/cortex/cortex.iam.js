const CacheRedis = require('../cache/cache.redis');

class CortexIAM {
  constructor() {
    this.cache = new CacheRedis({ url: process.env.CORTEX_IAM_CACHE_REDIS_URL }).getClient();
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

  async resetUserRoles({ platform, username }) {
    await this.cache.del(`${this.key}:${platform}:${username}`);
    const user = await strapi.db
      .query('api::cortex-user.cortex-user')
      .findOne({ where: { platform, username }, populate: ['roles'] });
    const roles = { userRoles: user.roles.map((item) => item.role) };
    await this.cache.set(`${this.key}:${platform}:${username}`, JSON.stringify(roles));
  }

  async authenticate({ platform, profile }) {
    let username = '';
    switch (platform) {
      case 'slack':
        username = profile.email;
        break;
      case 'telegram':
        username = profile.username;
        break;
      case 'whatsapp':
        username = profile.id;
        break;
      default:
        username = profile.email;
    }

    let result = await this.cache.get(`${this.key}:${platform}:${username}`);
    if (result) return { ...JSON.parse(result) };

    const user = await strapi.db
      .query('api::cortex-user.cortex-user')
      .findOne({ where: { platform, username }, populate: ['roles'] });
    if (!user) {
      const defaultRole = await strapi.db
        .query('api::cortex-iam.cortex-iam')
        .findOne({ where: { role: process.env.CORTEX_IAM_ROLES_DEFAULT } });
      await strapi.db.query('api::cortex-user.cortex-user').create({
        data: {
          username,
          platform,
          roles: [defaultRole.id],
        },
      });

      result = { userRoles: [defaultRole.role] };
    } else {
      result = { userRoles: user.roles.map((item) => item.role) };
    }

    await this.cache.set(`${this.key}:${platform}:${username}`, JSON.stringify(result));
    return { ...result };
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
