<template>
    <div>
        <h2>parent</h2>
        <p>{{parent}}</p>
        <button @click="toParent">收到了</button>
        <son></son>
        <Son2></Son2>
    </div>
</template>

<script>

import Son from './son'
import Son2 from './son2'

export default {
  props: ['parent'],
  methods: {
    toParent () {
      this.$emit('msgOk', '收到收到')
    }
  },
  components: {
    Son,
    Son2
  }
}
</script>
