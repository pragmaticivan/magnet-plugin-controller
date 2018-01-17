import {isFunction} from 'metal';

export default {
	test(module) {
		return isFunction(module.controller);
	},

	register(module, filename, magnet) {
		const app = magnet.getServer().getEngine();
		module.controller.call(module.controller, app, magnet);
	},
};
