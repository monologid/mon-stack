const CortexService = require('./cortex.service');
const CortexOperation = require('./cortex.operation');

class CortexIntegrationWhatsapp {
  constructor({ prompt }) {
    this.prompt = prompt;
  }

  getUserProfile({ message }) {
    const id = message.author.split('@')[0];
    console.dir({ message });
    return { id, fromId: message.from };
  }

  async onMessage({ message, profile }) {
    let cortexOperation = new CortexOperation({ userId: profile.id, prompt: message.body, profile });
    await cortexOperation.init();

    const result = await cortexOperation.run({ platform: 'whatsapp', userInput: message.body });
    switch (result.kind) {
      case 'api':
        break;
      case 'function':
        break;
      default:
        if (result.message) await this.bot.sendMessage(profile.fromId, result.message);
    }

    if (cortexOperation.isNextStep() && result.stepState !== 'waiting_input') {
      await this.onMessage({ message, profile });
    }
  }
}

module.exports = CortexIntegrationWhatsapp;
