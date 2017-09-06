/**
 * Created by Administrator on 2017/8/28.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.join(__dirname);
var APP_PATH = path.join(ROOT_PATH, 'app');
var BUILD_PATH = path.join(ROOT_PATH, 'build');
var TEMP_PATH = path.join(ROOT_PATH, 'templates');

module.exports = {
	entry: {
		index: path.resolve(APP_PATH,'index.jsx'),
	},
	output: {
		path: BUILD_PATH,
		filename: '[name].js',
		publicPath: '',
	},
	devtool : 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		hot: false,
		inline: true,
		host: '0.0.0.0',  //保证本地可通过ip访问
		port: 8880,
		proxy: {
			'/partner/*': {
				target: 'http://10.19.145.19:8127',
				secure: false,
				// changeOrigin: true
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				enforce: 'pre',  // 在babel-loader对源码进行编译前进行lint的检查
				use: [{
					loader: 'eslint-loader',
					options: {
						formatter: require('eslint-friendly-formatter')   // 编译后错误报告格式
					}
				}],
				include: APP_PATH,  // app文件夹下的文件需要被lint
				// exclude: /node_modules/ 可以不用定义这个字段的属性值，eslint会自动忽略node_modules和bower_
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					{
						loader: 'less-loader',
					},
				],
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
						loader: 'babel-loader?cacheDirectory',
						query: {
							babelrc: false,
							presets :['es2016', 'es2017', 'stage-2', 'react'],
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
		new HtmlwebpackPlugin({
			title: 'demo',
			template: path.resolve(TEMP_PATH, 'index_develop.html'),
			filename: 'index.html',
			//chunks这个参数告诉插件要引用entry里面的哪几个入口
			chunks: ['index'],
			//要把script插入到标签里
			inject: 'body'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'process.env.NODE_ENV': JSON.stringify('development'),
				'NODE_ENV': JSON.stringify('development')
			}
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./manifest.json'),
		}),
		new webpack.ProvidePlugin({
		}),
	],
	resolve: {
		modules: [path.resolve(__dirname, 'node_modules'), 'static'],
		extensions: ['.js','.jsx']
	}
};