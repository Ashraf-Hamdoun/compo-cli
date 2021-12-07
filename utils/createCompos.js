const fs = require('fs');
const path = require('path');
const copyDir = require('copy-folders');

async function copyTemplateFiles(options) {
	console.log('hey');
	return copyDir(options.templateDirectory, options.targetDirectory);
}

const createCompos = async options => {
	// handle targetDirectory
	options = {
		...options,
		targetDirectory:
			options.targetDirectory || process.cwd() + '\\src\\components'
	};

	// handle templateDirectory
	const templateDir = path.resolve(
		__dirname,
		'./templates',
		options.template.toLowerCase()
	);
	options.templateDirectory = templateDir;

	try {
		console.log('Checking target Directory ...');
		await fs.accessSync(templateDir, fs.constants.R_OK);
	} catch (err) {
		console.error('%s Invalid template name');
		console.log('templateDirectory: ', options.templateDirectory);
		console.log('targetDirectory: ', options.targetDirectory);
		process.exit(1);
	}

	console.log('Copy project files');
	await copyTemplateFiles(options);

	console.log('%s Project ready');
	console.log(options);

	return true;
};

module.exports = createCompos;
