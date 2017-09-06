/**
 * Created by Administrator on 2017/8/28.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');
var TEMP_PATH = path.resolve(ROOT_PATH,'templates');

module.exports = {
	entry: {
		common: ['jquery', 'react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'react-router', 'moment',
			'babel-polyfill', 'underscore', 'classnames', 'antd', 'echarts'],
		index: path.resolve(APP_PATH,'index.jsx'),
	},
	output: {
		path: BUILD_PATH,
		filename: '[name]_[chunkhash].js',
		// publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader?minimize',
						'postcss-loader',
						{
							loader: 'less-loader',
						},
					]
				}),
				include: APP_PATH
			},
			{
				test: /\.(png|jpg)$/,
				use: [{
					loader: 'url-loader',
					options: {limit: 40000}
				}],
			},
			{
				test: /\.jsx?$/,
				use: [
					{
						loader: 'babel-loader',
						query: {
							babelrc: false,
							presets :[
								['es2015',{"modules": false}],
								'es2016', 'es2017', 'stage-2', 'react'],
						}
					}
				],
				include: APP_PATH,
				exclude: /node_modules/
			},
			{
				test: /\.woff|\.woff2|\.svg|\.eot|\.ttf/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]'
					}
				}],
			}
		]
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({ options: { postcss: ['autoprefixer'] } }),
		new HtmlwebpackPlugin({
			title: 'demo',
			template: path.resolve(TEMP_PATH,'index_production.html'),
			filename: 'index.html',
			chunks: ['commons','index'],
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
		// 代码压缩
		new UglifyJSPlugin({
			minimize: true,
			// 最紧凑的输出
			beautify: false,
			comments: false,
			compress: {
				// 在UglifyJs删除没有用到的代码时不输出警告
				warnings: false,
				// optimize if-s and conditional expressions
				conditionals: true,
				// 删除所有的 `console` 语句
				// 还可以兼容ie浏览器
				drop_console: true,
				// 内嵌定义了但是只用到一次的变量
				collapse_vars: true,
				// 提取出出现多次但是没有定义成变量去引用的静态值
				reduce_vars: true,
			},
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',
			filename: 'commons_[hash].js',
			minChunks: 2
		}),
		new ExtractTextPlugin({
			filename: '[name]_[chunkhash].css',
			disable: false,
			allChunks: true,
		})
	],
	resolve: {
		modules: ['node_modules', 'static'],
		extensions: ['.js','.jsx'],
		// mainFields: ['jsnext:main','main'],
	}
};