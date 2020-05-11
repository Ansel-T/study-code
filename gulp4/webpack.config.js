const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const minimist = require('minimist');//命令行 参数解析

let srcDir = path.resolve(process.cwd(), 'src'),
    rootPath = path.resolve(srcDir, 'js'),
    filesArr = {};

var knownOptions = {
    string: 'env',
    default: {
        env: process.env.NODE_ENV
    }
};

let options = minimist(process.argv.slice(2), knownOptions),
    mode = options.env === 'production';
console.log(mode)
// 获取多页面的每个入口文件，用于配置中的entry
function getEntry(rootPath) {
    var dirs = fs.readdirSync(rootPath);
    var matchs = [];
    dirs.forEach(function(item) {
        let filePath = rootPath +'\\' + item;
        let stat = fs.statSync(filePath); //获取文件信息
        if(stat.isDirectory()){
            getEntry(filePath);
        } else {
            matchs = item.match(/(.+)\.js$/);
            if (matchs) {
                let key = filePath.replace(srcDir,'.')
                key = key.replace('.js','')
                filesArr[key] = filePath;
            }
        }
    });
    return filesArr;
}
module.exports = {
    mode: 'production',
    entry: getEntry(rootPath),
    output: {
        path: __dirname + '/dist/',
        filename: '[name].js',
        chunkFilename: '[id].js?[chunkhash]'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    //压缩js
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
    },
}