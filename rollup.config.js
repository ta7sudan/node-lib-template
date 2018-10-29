import replace from 'rollup-plugin-replace';
import minify from 'rollup-plugin-babel-minify';
import {relative} from 'path';
import { main, version, license, author, homepage } from './package.json';

/**
 * 为什么要rollup? 主要是为了替换DEBUG
 * 那为什么要压缩? 既然都用了rollup, 那不如压缩一下好了,
 * 反正VSC也支持sourcemap, 那就不影响调试了,
 * 而代码量少了, 是真的可以提高一丢丢性能...
 */
const banner = `/**
 * @Version ${version}
 * @Author: ${author}
 * @Repo: ${homepage}
 * @License: ${license}
 */`;

export default {
	input: 'src/index.js',
	plugins: [
		replace({
			DEBUG: JSON.stringify(false)
		}),
		minify({
			comments: false
		})
	],
	output: {
		banner,
		file: main,
		format: 'cjs',
		sourcemap: true,
		// sourcemap生成之后在devtools本来看到的文件是src/index.js, 这个选项可以变成{{bundleName}}.js
		sourcemapPathTransform: path =>
			~path.indexOf('index') ? '{{bundleName}}.js' : relative('src', path)
	}
};
