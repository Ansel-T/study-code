// 导入jquery模块
import $ from 'jquery'

// 导入样式表
import '../css/index.css'

import '../index.html';

// 奇数行一个颜色 :odd
$('#ulList>li:odd').css('backgroundColor','#ccc');

// 偶数行一个颜色 :even
$('#ulList>li:even').css('backgroundColor','#999');