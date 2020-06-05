<template>
  <div>
    <KFrom :model="model" :rules="rules" ref="loginFrom">
      <KFromItem label="用户名" prop="name">
        <KInput v-model="model.name"></KInput>
      </KFromItem>
      <KFromItem label="密码" prop="pwd">
        <KInput v-model="model.pwd" type="password"></KInput>
        <p>密码--{{model.pwd}}</p>
      </KFromItem>
      <KFromItem>
        <button @click="submit">提交</button>
      </KFromItem>
    </KFrom>
  </div>
</template>

<script>
import KFrom from './KFrom'
import KFromItem from './KFromItem'
import KInput from './KInput'
import Dialog from "@/components/dialog"
import create from "@/utils/dialog"
export default {
  components: {
    KFrom,
    KFromItem,
    KInput
  },
  data() {
    return {
      model: {
        name: '',
        pwd: '',

      },
      rules: {
        name: [{required: true, message: '请输入用户名'}],
        pwd: [{required: true, message: '请输入密码'}]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.loginFrom.validate( status => {
        let dialog = create(Dialog, {
          title: '登陆提示',
          message: status ? '登陆成功' : '登陆失败',
          duration: 2000
        })
        dialog.show()
      })
    }
  }
}
</script>