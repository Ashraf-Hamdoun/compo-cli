const welcome = require('cli-welcome');
const pkg = require('./../package.json');
const unhandled = require('cli-handle-unhandled');

module.exports = ({ clear = true }) => {
	unhandled();
	welcome({
		title: ` Compo CLI `,
		tagLine: `by Ashraf Hamdoun`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#FADC00',
		color: '#000000',
		bold: true,
		clear
	});
};
