//1.先引入
import Vue from 'vue'
import Router from 'vue-router'
import App from './../app.vue'

//2. 使用
Vue.use(Router);  //Vue全局使用Router

//3.配置
export default new Router ({
    routes:[
        {
            path:'/',
            component:App
        }
    ]
})