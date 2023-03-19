const CortexOperation = require('./cortex.operation');
const jwt = require('jsonwebtoken');

class CortexIntegrationWeb {
  constructor({ prompt, token }) {
    this.prompt = prompt;
    this.token = token;
  }

  init() {
    try {
      const { id } = jwt.verify(this.token, process.env.JWT_SECRET);
      return { id };
    } catch (e) {
      return {
        error: {
          status: 401,
          name: 'Unauthorized',
          message: 'Unauthorized access. Invalid token.',
        },
      };
    }
  }

  async getUserProfile(id) {
    if (!id) return { id };
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({ where: { id } });

    return user;
  }

  async onMessage({ prompt, profile }) {
    let cortexOperation = new CortexOperation({ userId: profile.id, prompt, profile });
    await cortexOperation.init();

    const result = await cortexOperation.run({ platform: 'web', userInput: prompt });

    if (cortexOperation.isNextStep() && result.stepState !== 'waiting_input') {
      return await this.onMessage({ prompt, profile });
    }

    if (result.kind == 'input') return { ...result };
    return result;
  }
}

module.exports = CortexIntegrationWeb;
