const webpack = require('webpack');
const merge = require('webpack-merge');
const { config } = require('./webpack.common');

module.exports = merge(config, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        proxy: {
            '/api': 'http://localhost:8000',
        },
        host: '0.0.0.0',
        historyApiFallback: true,
        port: 9000,
        hot: true,
        disableHostCheck: true,
    },
    resolve: {
        alias: {
            react: require.resolve('react'),
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
