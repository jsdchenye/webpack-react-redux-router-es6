/**
 * Created by Administrator on 2017/8/28.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
	// devServer: {
	// 	historyApiFallback: true,
	// 	hot: false,
	// 	inline: true,
	// 	host: '0.0.0.0',  //保证本地可通过ip访问
	// 	port: 8880,
	// 	proxy: {
	// 		'/partner/*': {
	// 			target: 'http://10.19.145.19:8127',
	// 			secure: false,
	// 			// changeOrigin: true
	// 		}
	// 	}
	// },
	module: {
		rules: [
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
		new BundleAnalyzerPlugin({
			analyzerMode: 'server',
			// Host that will be used in `server` mode to start HTTP server.
			analyzerHost: '127.0.0.1',
			// Port that will be used in `server` mode to start HTTP server.
			analyzerPort: 8888,
			// Path to bundle report file that will be generated in `static` mode.
			// Relative to bundles output directory.
			reportFilename: 'report.html',
			// Module sizes to show in report by default.
			// Should be one of `stat`, `parsed` or `gzip`.
			// See "Definitions" section for more information.
			defaultSizes: 'parsed',
			// Automatically open report in default browser
			openAnalyzer: true,
			// If `true`, Webpack Stats JSON file will be generated in bundles output directory
			generateStatsFile: false,
			// Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
			// Relative to bundles output directory.
			statsFilename: 'stats.json',
			// Options for `stats.toJson()` method.
			// For example you can exclude sources of your modules from stats file with `source: false` option.
			// See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
			statsOptions: null,
			// Log level. Can be 'info', 'warn', 'error' or 'silent'.
			logLevel: 'info'
		}),
	],
	resolve: {
		modules: [path.resolve(__dirname, 'node_modules'), 'static'],
		extensions: ['.js','.jsx']
	}
};