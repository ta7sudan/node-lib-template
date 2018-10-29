const test = require('ava');
const pock = require('pock/src/server');
const { resolve } = require('path');
const { safeLoad } = require('js-yaml');
const { readFileSync } = require('fs');

const pockrc = resolve(__dirname, '../.pockrc.yml');
let server = null;

test.before(async () => {
	const options = safeLoad(readFileSync(pockrc, 'utf8'));
	server = await pock(options, resolve(__dirname, '..'));
});

test.after(async () => {
	server.close();
});

