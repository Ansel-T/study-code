<template>
  <div>
    <h2>具名插槽</h2>
    <p><slot></slot></p>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  
}
</script>