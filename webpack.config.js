const webpack = require('webpack');
const path = require('path');

module.exports = {
	context: path.join(__dirname, '/app'),
	entry: './src/index.js',
	output: {
	    path: './app/build',
	    filename: 'index.js',
	    publicPath: 'http://localhost:3000/build'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel']
			},
			{
			 	test: /\.(css|less)$/,
			 	loader: "style!css!less"
			}
		]
	},
	plugins: [
		new webpack.OldWatchingPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	devServer: {
		hot: true,
		inline: true,
		port: 3000
	}
};
