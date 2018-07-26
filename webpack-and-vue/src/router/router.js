//1.先引入
import Vue from 'vue'
import Router from 'vue-router'
import App from './../app.vue'

const web = r => require.ensure([], () => r(require('../page/web/web')), 'web')


//2. 使用
Vue.use(Router);  //Vue全局使用Router

//3.配置
export default new Router ({
    routes:[
        {
            path:'/',
            component:App,
            children:[
                {
                    path: '',
                    redirect: '/index'
                },
                //首页
                {
                    path: '/index',
                    component: web
                },
                {
                    path: '/html',
                    component:resolve => require(["../page/html/html"], resolve)
                },
            ]
        }
    ]
})