import CortexBootstrap from './cortex';

export default class Bootstraps {
	constructor() {}

	async init() {
		await new CortexBootstrap().init();
	}
}
