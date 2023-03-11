const { Client, LocalAuth } = require('whatsapp-web.js');
const CortexService = require('./cortex.service');
const qrcode = require('qrcode-terminal');
const CortexOperation = require('./cortex.operation');

class CortexIntegrationWhatsapp {
  constructor() {
    this.bot = new Client({ authStrategy: new LocalAuth() });
    this.cortex = new CortexService();
  }

  init() {
    this.startEventListener();
    this.bot.on('qr', (qr) => {
      qrcode.generate(qr, { small: true })
    })
    this.bot.on('ready', () => {
      console.log('[CORTEX] Whatsapp integration is ready')
    })
    this.bot.initialize().then(null);
  }

  startEventListener() {
    this.bot.on('message', async (message) => {
      const profile = this.getUserProfile({ message })
      await this.onMessage({ message, profile })
    })
  }

  getUserProfile({ message }) {
    const id = message.author.split('@')[0]
    console.dir({ message })
    return { id, fromId: message.from }
  }

  async onMessage({ message, profile }) {
    if (message.from != message.author) {
      // This meaning that message came from a group
      // Then need to check `to` and `mentionIds`
    }

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
