var webpack = require('webpack');

module.exports = {
	context: __dirname,
	entry: './src/index.js',
	output: {
	    path: './build',
	    filename: 'index.js',
	    publicPath: 'http://localhost:3000/build'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	devServer: {
		hot: true,
		inline: true,
		port: 3000
	}
};
