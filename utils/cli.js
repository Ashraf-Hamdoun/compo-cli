const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	yes: {
		type: `boolean`,
		default: false,
		alias: `y`,
		desc: `Accept default values`
	},
	clear: {
		type: `boolean`,
		default: false,
		alias: `c`,
		desc: `Clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	install: {
		type: `boolean`,
		alias: 'i',
		desc: `Install dependencies`
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `compo-cli`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
