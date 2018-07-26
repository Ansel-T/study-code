//1. 引入Path模块处理路径问题
var path = require('path');
//2.引用自动生成HTML页面的模块
var htmlWebpackPlugin = require('html-webpack-plugin');
//3.引入webpack
var webpack = require('webpack');
// 导入删除路径的插件
var cleanWebpackPlugin = require('clean-webpack-plugin');
// 引入抽离CSS的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 导入压缩CSS的插件
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    //入口文件
    entry: {
        main: path.resolve(__dirname, 'src/main.js')
    },
    resolve: {
        extensions: ['.js', '.json', '.vue', '.jpg', '.mp4'],
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, 'src/'),
            'assets': path.resolve(__dirname, 'src/assets/'),
            'pages': path.resolve(__dirname, 'src/page/'),
            'components': path.resolve(__dirname, 'src/components/')
        }
    },
    //指定输出文件位置
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: 'js/[name].[chunkhash].min.js'
    },
    //loader
    module: {
        rules: [
            // 处理CSS文件的loader配置
            {
                test: /\.css$/, use: ExtractTextPlugin.extract({// 使用插件来处理CSS样式
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath:"../"
                })
            }, // 处理CSS文件的loader配置
            {
    　　　　　　test: /\.html$/,
    　　　　　　loader: 'html-withimg-loader'
    　　　　 },
            // 处理sass文件的loader配置
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            // 处理URL路径的loader
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=43959&name=img/imgs-[hash:7].[ext]' }, // 处理URL路径的loader
            // 最重要的一点：要把node_modules文件夹，添加到排除项，通过exclude排除这个文件夹【注意：一定要排除否则会报错！！！】
            {test:/\.js$/, use:'babel-loader', exclude:/node_modules/},
            {test: /\.vue$/, loader: 'vue-loader'},
        ]
    },
    devServer: { // 这里的配置项会交给webpack-dev-server去读取
        contentBase: path.resolve(__dirname, 'src'),
        open: true,
        port: 4321,
        hot: true
    },
    plugins: [ // 插件数组
        new htmlWebpackPlugin({ // 创建一个htmlWebpackPlugin插件
            template: path.resolve(__dirname, 'index.html'), // 指定模板页面
            filename: 'index.html', // 指定在内存中生成的页面的名称
            minify:{ // 压缩优化HTML页面
                collapseWhitespace:true, // 合并空白字符
                removeComments:true, // 移除注释
                removeAttributeQuotes:true // 移除属性上的引号
            }
        }),
        //vue loader
        new VueLoaderPlugin(),
        new cleanWebpackPlugin(['dist']), // 创建一个删除文件夹的插件，把dist目录传递进去
        new webpack.optimize.CommonsChunkPlugin({
            name: 'js/vendors', // 指定抽取公共模块的名称
            filename: 'js/common.js' // 指定抽取出来的文件真实名称
        }),
        new webpack.optimize.UglifyJsPlugin({ // 创建压缩JS代码的插件
            compress: { // 压缩的意思
                warnings: false  // 移除警告信息
            }
        }),
        new ExtractTextPlugin("css/[name].css"), // 抽离CSS样式名称
        new OptimizeCssAssetsPlugin(), // 创建一个压缩CSS文件的插件
        new webpack.HotModuleReplacementPlugin() // 使用webpack下面的.HotModuleReplacementPlugin()实现热更新
    ]
}