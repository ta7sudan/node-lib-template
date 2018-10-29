'use strict';

module.exports = function (projectName) {
	return {
		prompts: [
			{
				name: 'project',
				type: 'input',
				message: 'Project Name',
				default: projectName
			},
			{
				name: 'author',
				type: 'input',
				message: 'Author',
				validate(input) {
					return !!input;
				}
			},
			{
				name: 'desc',
				type: 'input',
				message: 'Project description',
				default: 'A rollup library project'
			},
			{
				name: 'keywords',
				type: 'input',
				message: 'Keywords',
				default: 'rollup'
			},
			{
				name: 'hasRollup',
				type: 'confirm',
				message: 'Set up Rollup?',
				default: true
			},
			{
				name: 'bundleName',
				type: 'input',
				message: 'Bundle name',
				default: projectName,
				when({ hasRollup }) {
					return hasRollup;
				}
			},
			{
				name: 'hasTest',
				type: 'confirm',
				message: 'Set up unit tests?',
				default: true
			},
			{
				name: 'hasPock',
				type: 'confirm',
				message: 'Use pock for dev and tests?',
				default: true
			},
			{
				name: 'hasTravis',
				type: 'confirm',
				message: 'Use travis-ci?',
				default: true
			},
			{
				name: 'email',
				type: 'input',
				message: 'Email',
				validate(input) {
					return !!input;
				},
				when({ hasTravis }) {
					return hasTravis;
				}
			},
			{
				name: 'needNpmrc',
				type: 'confirm',
				message: 'need .npmrc?',
				default: false
			}
		],
		complete(answers) {
			const { hasRollup, hasTest, hasPock, hasTravis, needNpmrc } = answers,
				excludes = ['.dulu.js'],
				templates = ['_package.json', 'LICENSE', 'rollup.config.js', 'rollup.dev.js', 'README.md'],
				transform = {
					'_package.json': 'package.json'
				};
			answers.keywords = answers.keywords ? answers.keywords.split(/\s+/) : [];

			if (!hasRollup) {
				excludes.push('rollup.config.js', 'rollup.dev.js')
			}

			if (!needNpmrc) {
				excludes.push('.npmrc');
			}

			if (!hasTravis) {
				excludes.push('.travis.yml');
			} else {
				templates.push('.travis.yml');
			}

			if (hasTest) {
				templates.push('test/index.test.js');
				if (!hasPock) {
					excludes.push('test/_pock.js');
				}
			} else if (!hasPock) {
				excludes.push('.pockrc.yml', 'example/router');
			}

			return {
				excludes,
				templates,
				transform
			};
		}
	};
};
