const path = require('path');

const config = {
	entry: './src/index.js',
  	output: {
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'umd',
		library: 'spotifyWrapper'
	},
	devtool: 'source-map',  
  	module: {
	    rules: [
      		{ test: /\.js$/, use: 'babel-loader' }
    	]
	},
	mode: 'none'
};

module.exports = config;
