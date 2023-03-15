const { NlpManager } = require('node-nlp');

const nlpManager = new NlpManager({
  forceNER: true,
  autoSave: process.env.CORTEX_MODEL_AUTOSAVE_ENABLED == 'true' ? true : false,
  languages: process.env.CORTEX_LANGUAGES ? process.env.CORTEX_LANGUAGES.split(',') : ['en'],
});

class CortexService {
  constructor() {
    this.cortex = nlpManager;
  }

  async addContext({ intent, prompt, language }) {
    if (!language) language = 'en';
    await this.cortex.addDocument(language, prompt, intent);
    await this.train();
  }

  async getContext({ prompt, language }) {
    if (!language) language = 'en';
    return await this.cortex.process(language, prompt);
  }

  async train() {
    await this.cortex.train();
  }
}

module.exports = CortexService;
