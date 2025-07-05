import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { buildOptions } from './types/config';
export function buildPlugins({
	paths,
}: buildOptions): webpack.WebpackPluginInstance[] {
	return [
		new HTMLWebpackPlugin({
			template: paths.html,
		}),
		new webpack.ProgressPlugin(),
	];
}
