import webpack from 'webpack';
export function buildeResolvers(): webpack.ResolveOptions {
	return {
		extensions: ['.tsx', '.ts', '.js'],
	};
}
