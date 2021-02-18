const { merge } = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const { config, scopedStylesOptions } = require('./webpack.common');

module.exports = merge(config, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'react-scoped-styles/style-loader',
                        options: scopedStylesOptions,
                    },
                    'stylus-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
    ],
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new CssMinimizerPlugin(),
            // new OptimizeCSSAssetsPlugin({}),
            new CompressionPlugin()
        ],
    },
});
