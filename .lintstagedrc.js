'use strict';
module.exports = {
	'*.js': files => files.map(file => `eslint ${file}`)
};