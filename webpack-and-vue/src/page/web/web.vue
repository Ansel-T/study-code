<template>
    <div>
        <head-top></head-top>
        <p>我是web首页</p>
        <div id="main">
            <h2>html</h2>
            <router-link to="/html">
				<span class="title_text ellipsis">点击前往html页面</span>
			</router-link>
            <h2>javacsript</h2>
        </div>
        <footer-list></footer-list>
    </div>
</template>

<script>
import headTop from '../../components/header/header.vue'
import footerList from '../../components/footer/footer.vue'
import aboutUs from '../../components/common/about.vue'

export default {
    data(){
        return {

        }
    },
    components:{
        headTop,
        footerList,
        aboutUs
    }
}
</script>

<style scoped>
#main h2{
    padding: 20px;
    border-left: 4px solid green;
    height: 30px;
    line-height: 30px;
}
</style>
