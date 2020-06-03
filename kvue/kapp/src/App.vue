<template>
  <div id="app">
    <!-- <div class="item">
      <p>传给父组件的值收到回复 -> {{parentMsgOk}}</p>
      <parent :parent="parentMsg" @msgOk="changeMsgOk"></parent>
    </div> -->

    <!-- <slots></slots> -->
    
    <!-- <ktree></ktree> -->

    <!-- dialog -->
    <button @click="dialogHandler">dialog</button>
  </div>
</template>

<script>

import Parent from './views/parent'
import Slots from '@/components/slots'
import Ktree from '@/components/ktree'
import Dialog from "@/components/dialog";
import create from "@/utils/dialog";

export default {
  provide: {
    sonMsg: '孙子好 我是你yy'
  },
  data () {
    return {
      parentMsg: '这是传给父组件的值',
      parentMsgOk: '未收到'
    }
  },
  components: {
    Parent,
    Slots,
    Ktree
  },
  mounted () {
    this.$bus.$on('event-bus', msg => {
      console.log('接受event-bus消息: ' + msg)
    })
  },
  methods: {
    changeMsgOk (value) {
      this.parentMsgOk = value
    },
    dialogHandler (){
      let dialog = create(Dialog, {
        title: 'Dialog 标题',
        message: '报错了，怎么回事',
        duration: 2000
      })
      dialog.show()
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

.item{
  padding: 10px;
  border: 1px solid #333;
}
</style>
