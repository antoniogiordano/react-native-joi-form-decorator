var webpack = require('webpack')
var path = require('path')

module.exports = {
	context: path.join(__dirname, 'src'),
	entry: {
		index: path.join(__dirname, 'src', 'index.js')
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'index.js',
		library: 'react-native-joi-form-decorator',
		libraryTarget: 'umd'
	},
	module: {
		rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader'] }]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		modules: ['node_modules'],
    alias: {
      joi: 'react-native-joi'
    }
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	],
	externals: {
		react: 'react',
    'react-native-joi': 'react-native-joi'
	},
	devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : ''
}
