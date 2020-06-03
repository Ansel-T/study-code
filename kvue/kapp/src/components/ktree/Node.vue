<template>
  <li>
    <div @click="toggle">
      <span>{{dataList.title}}</span>
      <span v-if="isFlolder">[{{open ? '-' : '+'}}]</span>
    </div>
    <ul v-show="open" v-if="isFlolder">
      <node v-for="itemData in dataList.children" :key="itemData.title" :dataList="itemData"></node>
    </ul>
  </li>
</template>

<script>
export default {
  name:'Node',
  props: ['dataList'],
  data() {
    return {
      open:false
    }
  },
  methods: {
    toggle() {
      if(this.isFlolder){
        this.open = !this.open
      }
    }
  },
  computed: {
    isFlolder() {
      return this.dataList.children && this.dataList.children.length
    }
  }
}
</script>