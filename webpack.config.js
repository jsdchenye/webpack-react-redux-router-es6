var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEMP_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
	entry: {
		index: path.resolve(APP_PATH,'index.js'),
	},
	output: {
		path: BUILD_PATH,
		filename: '[name].[hash].js',
		// publicPath: '/',
	},
	devtool : 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		host: '0.0.0.0',  //保证本地可通过ip访问
		port: 8080,
		proxy: {
			'/partner/*': {
				target: 'http://10.19.145.19:8127',
				secure: false,
				changeOrigin: true
			}
		}
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style','css'],
				include: APP_PATH
			},
			{
				test: /\.less$/,
				loaders: ['style','css','less'],
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
				loader: 'url?prefix=foot/&limit=10000'
			}
		]
	},
	babel: {
		presets: ['es2015','stage-0','react']
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
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
	],
	resolve: {
		modulesDirectories: ['node_modules', 'static'],
		extensions: ['','.js','.jsx']
	}
};