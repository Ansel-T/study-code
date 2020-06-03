<template>
    <div>
        <h2>我是son</h2>
        <p>这是我爷爷对我说的话-> {{sonMsg}}</p>
        {{msg}}
    </div>
</template>

<script>

export default {
  inject: ['sonMsg'],
  data () {
    return {
      msg: ''
    }
  },
  mounted () {
    this.$parent.$on('toSon1', msg => {
      console.log(`${msg}, 你找我干嘛`)
    })
  }
}
</script>
