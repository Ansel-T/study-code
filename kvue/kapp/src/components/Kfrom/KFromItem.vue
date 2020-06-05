<template>
  <div class="from-item">
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p class="error" v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: String
  },
  data() {
    return {
      errorMessage: ''
    }
  },
  mounted() {
    //监听input 事件执行验证
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate() {
      let rules = this.form.rules[this.prop]
      let value = this.form.model[this.prop]

      let desc = {
        [this.prop]: rules
      }
      let schema = new Schema(desc)
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          // 有错
          this.errorMessage = errors[0].message;
        } else {
          // 没错，清除错误信息
          this.errorMessage = "";
        }
      });
    }
  }

}
</script>
<style>
  .from-item{
    padding: 5px 0;
  }
  .error{
    color: red;
  }
</style>