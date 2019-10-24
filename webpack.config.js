const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = (env, ...props) => {
    const isDevelopment = env === 'development';
    return {
        mode: env,
        entry: './src/app/app.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader"
                        }
                    ]
                },
                {
                    test: /\.module\.s(a|c)ss$/,
                    loader: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: isDevelopment
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    autoprefixer({
                                        overrideBrowserslist: [
                                            "IE 10",
                                            "last 5 version",
                                        ],
                                        cascade: true,
                                    }),
                                ],
                                config: {
                                    path: path.resolve('./postcss.config.js'),
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment
                            }
                        },
                    ]
                },
                {
                    test: /\.s(a|c)ss$/,
                    exclude: /\.module.(s(a|c)ss)$/,
                    loader: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    autoprefixer({
                                        overrideBrowserslist: [
                                            "IE 10",
                                            "last 5 version",
                                        ],
                                        cascade: true,
                                    }),
                                ],
                                config: {
                                    path: path.resolve('./postcss.config.js'),
                                },
                            },
                        },
                    ]
                },
                {
                    test: /\.txt$/,
                    use: 'raw-loader'
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: env
                }
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "./src/app/public/index.html"),
                filename: "index.html"
            }),
            new MiniCssExtractPlugin({
                filename: '[name]-[chunkhash].css',
                chunkFilename: '[name]-[chunkhash].css',
            }),
        ],
        resolve: {
            extensions: ['.js', '.jsx', '.scss']
        }
    }
};


