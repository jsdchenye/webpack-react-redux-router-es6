var webpack = require('webpack');

var vendors = [
	'jquery',
	'react',
	'react-dom',
	'redux',
	'react-redux',
	'redux-thunk',
	'moment',
	'babel-polyfill',
	'underscore',
	'classnames',
	'antd',
	'echarts',
	'react-router'
];
module.exports = {
	output: {
		path: './output',
		filename: '[name].js',
		library: '[name]',
	},
	entry: {
		"lib": vendors,
	},
	plugins: [
		new webpack.DllPlugin({
			path: 'manifest.json',
			name: '[name]',
			context: __dirname,
		})
	],
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};