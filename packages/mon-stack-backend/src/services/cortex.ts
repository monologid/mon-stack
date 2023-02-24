import { NlpManager } from 'node-nlp';

const cortex: NlpManager = new NlpManager({
	languages: process.env.CORTEX_LANGUAGES.split(','),
	forceNER: true,
	autoSave: process.env.CORTEX_MODEL_AUTOSAVE_ENABLED == 'true' ? true : false,
});

export default class Cortex {
	private cortex: NlpManager;

	constructor() {
		this.cortex = cortex;
	}

	async train() {
		await this.cortex.train();
	}

	async addContext(intent: string, prompt: string, language?: any) {
		if (!language) language = 'en';
		this.cortex.addDocument(language, prompt, intent);
		await this.train();
	}

	async getContext(prompt: string, language?: any) {
		if (!language) language = 'en';
		return await this.cortex.process(language, prompt);
	}
}
