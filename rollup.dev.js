import replace from 'rollup-plugin-replace';
import { relative } from 'path';
import { name } from './package.json';

export default {
	input: 'src/index.js',
	plugins: [
		replace({
			DEBUG: JSON.stringify(true)
		})
	],
	output: {
		name,
		file: 'example/{{bundleName}}.js',
		format: 'cjs',
		sourcemap: true,
		sourcemapPathTransform: path =>
			~path.indexOf('index') ? '{{bundleName}}.js' : relative('src', path)
	}
};
