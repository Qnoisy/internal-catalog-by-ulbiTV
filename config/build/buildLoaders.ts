import webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
	const { isDev } = options;
	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack']
	};

	const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
	const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

	const fileLoader = {
		test: /\.(png|jpe?g|gif)$/i,
		use: [
			{
				loader: 'file-loader'
			}
		]
	};

	const cssLoader = buildCssLoader(isDev);
	// const typescriptLoader = {
	// 	test: /\.tsx?$/,
	// 	use: 'ts-loader',
	// 	exclude: /node_modules/
	// };
	return [svgLoader, codeBabelLoader, tsxCodeBabelLoader, fileLoader, cssLoader];
}
