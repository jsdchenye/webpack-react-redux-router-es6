var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');
var TEMP_PATH = path.resolve(ROOT_PATH,'templates');

module.exports = {
	entry: {
		common: ['jquery', 'react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'react-router', 'moment',
			'babel-polyfill', 'underscore', 'classnames', 'antd', 'echarts'],
		index: path.resolve(APP_PATH,'index.js'),
	},
	output: {
		path: BUILD_PATH,
		filename: '[name].[hash].js',
		// publicPath: '/',
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ExtractTextPlugin.extract("style-loader", "css-loader"),
				include: APP_PATH
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader"),
				include: APP_PATH
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url?limit=40000'
			},
			{
				test: /\.jsx?$/,
				loader: 'babel',
				include: APP_PATH,
				exclude: /node_modules/
			},
			{
				test: /\.woff|\.woff2|\.svg|\.eot|\.ttf/,
				loader: 'file-loader?name=[name].[ext]'
			}
		]
	},
	babel: {
		presets: ['es2015','stage-0','react']
	},
	plugins: [
		new HtmlwebpackPlugin({
			title: 'demo',
			template: path.resolve(TEMP_PATH,'index_production.html'),
			filename: 'index.html',
			chunks: ['common','index'],
			inject: 'body',
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			"window.jQuery": 'jquery'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		}),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			},
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'common.js',
			minChunks: 2
		}),
		new ExtractTextPlugin("common.css")
	],
	resolve: {
		modulesDirectories: ['node_modules', 'static'],
		extensions: ['','.js','.jsx']
	}
};