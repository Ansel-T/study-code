<template>
  <div>
    <h2>作用域插槽</h2>
    <slot :foo="foo"></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        foo:'foo~~~~'
      }
    }
  }
</script>