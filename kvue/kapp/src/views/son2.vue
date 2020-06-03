<template>
    <div>
        <h2>我是son2</h2>
        <button @click="toSon1">通知son1</button>
        <p>
            <button @click="eventBus">发布event-bus</button>
        </p>
    </div>
</template>
<script>
export default {
  methods: {
    toSon1 () {
      this.$parent.$emit('toSon1', 'son2')
    },
    eventBus () {
      this.$bus.$emit('event-bus', 'eventBus 测试')
    }
  }
}
</script>
