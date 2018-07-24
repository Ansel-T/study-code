//1. 引入Path模块处理路径问题
var path = require('path');
//2.引用自动生成HTML页面的模块
var htmlWebpackPlugin = require('html-webpack-plugin');
//3.引入webpack
var webpack = require('webpack');

module.exports = {
    //入口文件
    entry: {
        main: path.resolve(__dirname, 'src/js/index.js')
    },
    //指定输出文件位置
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    //loader
    module: {
        rules: [
            // 处理CSS文件的loader配置
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // 处理sass文件的loader配置
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            // 处理URL路径的loader
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=43959' },
            // 最重要的一点：要把node_modules文件夹，添加到排除项，通过exclude排除这个文件夹【注意：一定要排除否则会报错！！！】
            {test:/\.js$/, use:'babel-loader', exclude:/node_modules/}
        ]
    },
    devServer: { // 这里的配置项会交给webpack-dev-server去读取
        //--contentBase src --open --port 4321
        contentBase: path.resolve(__dirname, 'src'), // 配置启动路径
        open: true, // 自动打开浏览器
        port: 4321, // 指定端口号
        hot: true // 启用热更新
    },
    plugins: [ // 插件数组
        new htmlWebpackPlugin({ // 创建一个htmlWebpackPlugin插件
            template: path.resolve(__dirname, 'src/index.html'), // 指定模板页面
            filename: 'index.html' // 指定在内存中生成的页面的名称
        }),
        new webpack.HotModuleReplacementPlugin() // 使用webpack下面的.HotModuleReplacementPlugin()实现热更新
    ]
}