import webpack from 'webpack';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildeResolvers } from './buildResolvers';
import { buildOptions } from './types/config';
export function buildWebpackConfig(
	options: buildOptions
): webpack.Configuration {
	const { paths, mode } = options;

	return {
		mode,
		entry: paths.entry,
		output: {
			filename: '[name].[contenthash].js',
			path: paths.build,
			clean: true,
		},
		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(),
		},
		resolve: buildeResolvers(),
	};
}
