const inquirer = require('inquirer');

const choices = ['JavaScript', 'TypeScript', 'React'];

// function to check if the input template name valid or no
function checkTemplate(input, flags) {
	return {
		...flags,
		skipPrompts: flags['yes'] || false,
		runInstall: flags['install'] || false
	};
}

// function to handle missing options
async function promptForMissingOptions(options) {
	const defaultTemplate = 'JavaScript';
	const defaultName = 'My_Component';

	if (options.skipPrompts) {
		return {
			...options,
			templateName: options.templateName || defaultName,
			template: options.template || defaultTemplate
		};
	}

	// Questions when missing an option
	const questions = [];
	if (!options.templateName) {
		questions.push({
			type: 'input',
			name: 'templateName',
			message: "Please type your component's name ",
			default: defaultName
		});
	}

	if (!options.template) {
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
		templateName: options.templateName || answers.templateName,
		template: options.template || answers.template,
		git: options.git || answers.git
	};
}

async function handleFlags(input, flags) {
	let options = await checkTemplate(input, flags);

	options = await promptForMissingOptions(options);
	return options;
}

module.exports = handleFlags;
