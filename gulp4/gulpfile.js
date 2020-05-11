var { src, dest, series, parallel, watch} = require('gulp');
var autoprefixer  = require('gulp-autoprefixer'); // 自动添加css前缀
var minifyCss     = require('gulp-minify-css'); // 压缩css一行
var uglify        = require('gulp-uglify'); // 压缩js代码
var del           = require('del'); // 删除文件
var fileInclude   = require('gulp-file-include'); // include 文件用
var htmlmin       = require('gulp-htmlmin'); // 压缩html
var gulpIf        = require('gulp-if'); // 条件判断
var minimist      = require('minimist');//命令行 参数解析
var rename        =require('gulp-rename');   //文件重命名
var replace       =require('gulp-replace');   //文件字符替换
var changed       = require('gulp-changed'); //编译优化
var less          = require('gulp-less');
var babel         = require("gulp-babel");
var through2      = require('through2');

// 结合webpack
// 通过webpack 编译 es6+ 原生Api
var webpack       = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

// 代理请求 / 端口设置 / 编译路径
var config = require('./gulp.config.js');

// 区分开发和生产环境
// process.env.NODE_ENV = "production";//生产环境
var knownOptions = {
    string: 'env',
    default: {
        env: process.env.NODE_ENV
    }
};

let options = minimist(process.argv.slice(2), knownOptions),
    mode = options.env === 'production';
/**
 * @description: html中css引入文件添加版本参数
 * @param {type} 
 * @return: 
 */
function replaceCssRev(context, v){
    let linkReg = /<link.*?href=(?:"[^"]*"|'[^']*')[^<>]*>/g;
    let srcReg = /href=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let cssUrlArr = context.match(linkReg);
    if(cssUrlArr){
        for (var i = 0; i < cssUrlArr.length; i++) {
            var src = cssUrlArr[i].match(srcReg);
            var url = src[1]
            if(url){
                var currentUrlArr =  url.split("?v=");
                var newUrl = currentUrlArr[0] + "?v=" + v;
                context = context.replace(url,newUrl);
            }
        }
    }
    return context;
}

/**
 * @description: html中js引入文件添加版本参数
 * @param {type} 
 * @return: 
 */
function replaceJsRev(context, v){
    let scriptReg = /<script.*?src=\"(.+?)\">.*?<\/script>/g;
    let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let jsUrlArr = context.match(scriptReg);
    if(jsUrlArr){
        for (var i = 0; i < jsUrlArr.length; i++) {
            var src = jsUrlArr[i].match(srcReg);
            var url = src[1]
            if(url){
                var currentUrlArr =  url.split("?v=");
                var newUrl = currentUrlArr[0] + "?v=" + v;
                context = context.replace(url,newUrl);
            }
        }
    }
    return context;
}

function cleanDist(cb) {
    del(config.rootDist,{force: true}).then(paths => {
        console.log('Deleted files and folders:', paths.join('\n'));
        cb();
    });
};

function htmlMin() {
    let optionsSet = {
        removeComments: true, // 清除HTML注释
        collapseWhitespace: true, // 压缩HTML
        collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false, // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false, // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false, // 删除<style>和<link>的type="text/css"
        minifyJS: true, // 压缩页面JS
        minifyCSS: true // 压缩页面CSS
    };

    return src([config.dev.html, '!*.tpl'], { base: config.rootDev })
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(through2.obj(function(file, _, cb) {
            if (file.isBuffer()) {
              let content = file.contents.toString()
              let v = new Date().getTime();
              content = replaceCssRev(content, v)
              content = replaceJsRev(content, v)
              file.contents = Buffer.from(content)
            }
            cb(null, file);
        }))
        .pipe(gulpIf(mode, htmlmin(optionsSet)))
        .pipe(changed(config.build.html))
        .pipe(dest(config.build.html))
}

function cssMin() {
    let AUTOPREFIXER_BROWSERS = [
        'last 6 version',
        'ie >= 6',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.0',
        'bb >= 10'
    ];
    return src(config.dev.css)
        .pipe(less())
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulpIf(mode, minifyCss()))
        .pipe(changed(config.build.css))
        .pipe(dest(config.build.css))
}

function jsMin(){
    return src(config.dev.js)
        // .pipe(webpack( webpackConfig ))
        .pipe(babel())
        .pipe(gulpIf(mode,uglify()))
        // .pipe(gulpIf(mode,rename({suffix: '.min'})))
        .pipe(changed(config.build.js))
        .pipe(dest(config.build.js))
}

function images() {
    return src(config.dev.image)
        .pipe(changed(config.build.image))
        .pipe(dest(config.build.image))
}

function i18n() {
    return src(config.dev.i18n)
        .pipe(changed(config.build.i18n))
        .pipe(dest(config.build.i18n))
}


function watchFile(){
    watch(config.dev.js, series(jsMin));
    watch(config.dev.css, series(cssMin));
    watch(config.dev.image, series(images));
    watch(config.dev.i18n, series(i18n));
    watch([config.dev.html, config.dev.tpl], series(htmlMin));
}

exports.build = series(cleanDist, htmlMin, parallel(
    cssMin, jsMin, images, i18n
))
exports.dev = series(cleanDist,htmlMin, parallel(
    cssMin, jsMin, images, i18n
), watchFile)
