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
				default: 'A node library project'
			},
			{
				name: 'keywords',
				type: 'input',
				message: 'Keywords',
				default: 'todo'
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
			const { hasTest, hasPock, hasTravis, needNpmrc } = answers,
				excludes = ['.dulu.js'],
				templates = ['_package.json', 'LICENSE', 'README.md'],
				transform = {
					'_package.json': 'package.json'
				};
			answers.keywords = answers.keywords ? answers.keywords.split(/\s+/) : [];

			if (!needNpmrc) {
				excludes.push('.npmrc');
			}

			if (!hasTravis) {
				excludes.push('.travis.yml');
			} else {
				templates.push('.travis.yml');
			}

			if (!hasPock) {
				excludes.push('.pockrc.yml', 'example/router');
			}

			if (hasTest) {
				templates.push('test/index.test.js');
				if (!hasPock) {
					excludes.push('test/_pock.js');
				}
			} else {
				excludes.push('test');
			}

			return {
				excludes,
				templates,
				transform
			};
		}
	};
};
