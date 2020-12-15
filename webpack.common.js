const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.scopedStylesOptions = {
    globalsPrefix: ['uq'],
};

exports.config = {
    entry: './src/index.tsx',
    output: {
        filename: '[name].[fullhash:8].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
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
            shared: path.resolve(__dirname, './src/shared'),
            assets: path.resolve(__dirname, './src/assets'),
            styles: path.resolve(__dirname, './src/styles'),
            layout: path.resolve(__dirname, './src/layout'),
            auth: path.resolve(__dirname, './src/auth'),
            user: path.resolve(__dirname, './src/user'),
            lang: path.resolve(__dirname, './src/lang'),
        },
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
