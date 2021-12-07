const inquirer = require('inquirer');

const choices = ['JavaScript', 'TypeScript', 'React'];

// function to handle missing options
async function promptForMissingOptions(options) {
	const defaultTemplate = 'JavaScript';
	if (options.skipPrompts) {
		return {
			...options,
			template: options.template || defaultTemplate
		};
	}

	// Questions when missing an option
	const questions = [];
	if (!options.template || options.template === '') {
		questions.push({
			type: 'list',
			name: 'template',
			message: 'Please choose which project template to use',
			choices: choices,
			default: defaultTemplate
		});
	}

	if (!options.git) {
		questions.push({
			type: 'confirm',
			name: 'git',
			message: 'Initialize a git repository?',
			default: false
		});
	}

	// Answers of asked questions
	const answers = await inquirer.prompt(questions);
	return {
		...options,
		template: options.template || answers.template,
		git: options.git || answers.git
	};
}

// function to check if the input template name valid or no
function checkTemplate(input, flags) {
	let template = '';

	console.log('Checking template name ...');

	for (let i = 0; i < choices.length; i++) {
		const ele = choices[i];
		const inputEle = input[0].toLowerCase();

		if (input[0] === undefined || inputEle != ele.toLowerCase()) {
			// nothing to do here
		} else {
			console.log(ele + ' template is found');
			template = ele;
		}
	}

	if (template === '') {
		console.log('Invalid template name !');
	}

	return {
		...flags,
		template: template,
		skipPrompts: flags['yes'] || false,
		runInstall: flags['install'] || false
	};
}

async function handleFlags(input, flags) {
	let options = await checkTemplate(input, flags);

	options = await promptForMissingOptions(options);
	return options;
}

module.exports = handleFlags;
