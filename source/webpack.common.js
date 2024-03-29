const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const env = process.env.ENVIRONMENT || 'LOCAL';

const envFiles = {
    LOCAL: '.env.local',
    TEST: '.env.test',
    PROD: '.env.prod',
};

require('dotenv').config({ path: path.join('env', envFiles[env]) });

exports.scopedStylesOptions = {
    include: ['change_this'],
};

exports.config = {
    entry: './src/index.tsx',
    output: {
        filename: '[name].[contenthash:8].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'react-scoped-styles/script-loader',
                        options: exports.scopedStylesOptions,
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            silent: true,
                        },
                    },
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'react-scoped-styles/style-loader',
                        options: exports.scopedStylesOptions,
                    },
                    'stylus-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    limit: 8192,
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        limit: 8192,
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            'react/jsx-runtime': require.resolve('react/jsx-runtime'),
        },
        plugins: [new TsconfigPathsPlugin()]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
    ],
};
