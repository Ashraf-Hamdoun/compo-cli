const fs = require('fs');
const path = require('path');
const copyDir = require('copy-folders');

async function copyTemplateFiles(options) {
	return copyDir(options.templateDirectory, options.targetDirectory);
}

async function MakeDirectory(targetDir) {
	try {
		fs.mkdirSync(process.cwd() + '\\' + targetDir);
	} catch (err) {
		console.log('MakeDir ', err);
	}
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

	// check template directory
	try {
		console.log('Checking target Directory ...');
		await fs.accessSync(templateDir, fs.constants.R_OK);
	} catch (err) {
		console.error('%s Invalid template "' + options.template + '"');
		process.exit(1);
	}

	// check template directory
	try {
		console.log('Checking target Directory ...');
		await fs.accessSync(options.targetDirectory, fs.constants.R_OK);
	} catch (err) {
		console.error('%s Invalid target directory name');

		MakeDirectory('src');
		MakeDirectory('src\\components');
	}

	console.log('Copy project files');
	await copyTemplateFiles(options);

	console.log('%s Project ready');
	console.log(options);

	return true;
};

module.exports = createCompos;
