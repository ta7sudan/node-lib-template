const test = require('ava');{{if hasPock}}
require('./_pock');{{/if}}

/* global todo */


const sleep = time => new Promise(rs => setTimeout(rs, time));
const isObj = o => Object.prototype.toString.call(o) === '[object Object]';

test('todo', async (t, page) => {
	t.pass();
});
