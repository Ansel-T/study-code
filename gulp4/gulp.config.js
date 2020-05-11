// 存放未编译的文件夹
const ROOT_SRC ='src';
// 存放编译过后的文件夹
const ROOT_BUILD ='dist';

const dev = {
    html : ROOT_SRC + '/**/*.html',
    css  : ROOT_SRC + '/**/*.less',
    js   : ROOT_SRC + '/**/*.js',
    image: ROOT_SRC + '/**/*.{png,jpg,gif,ico}',
    i18n: ROOT_SRC + '/**/*',
    tpl  : ROOT_SRC + '/**/*.tpl',
}

const build = {
    html : ROOT_BUILD + '',
    css  : ROOT_BUILD + '/',
    js   : ROOT_BUILD + '/',
    image: ROOT_BUILD + '/',
    i18n: ROOT_BUILD + '/',
    rev  : ROOT_BUILD + '/rev/',
    revHtml: ROOT_BUILD + '/**/*.html',
}

module.exports = {
    rootSRC: ROOT_SRC,
    rootDist: ROOT_BUILD,
    // 未编译的路径
    dev,
    // 编译过后的路径
    build
};

