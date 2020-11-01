const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'; 

module.exports = {
    entry: {
        main: './src/pages/index.js',
        articles: './src/pages/articles/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                use: {loader: "babel-loader"},
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|ico|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]',
                            esModule: false,
                        },
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {},
                    },
                ],
            },
            {
                test: /\.css$/, 
                use: [
                    isDev 
                        ? 'style-loader'
                        : {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../', 
                            },
                        },
                    'css-loader',
                    'postcss-loader', 
                ], 
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/, 
                loader: "file-loader?name=./vendor/[name].[ext]",
            },

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style/style.[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { calc: false }], 
            },
            canPrint: true
        }),
        new WebpackMd5Hash(),

        
        new HtmlWebpackPlugin({
            
            inject: false, 
            template: './src/pages/index.html', 
            filename: 'index.html', 
            chunks: ['main'],
        }),

       
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/pages/articles.html', 
            filename: 'articles.html',
            chunks: ['articles'], 
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
    ]
};
