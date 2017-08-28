/**
 * Created by Administrator on 2017/8/28.
 */
var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.join(__dirname);

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
		path: path.join(ROOT_PATH, 'output'),
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
		extensions: ['.js', '.jsx']
	}
};