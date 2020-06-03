<template>
    <div>
        <h1>插槽</h1>
        <comp1>
          这是一个匿名插槽
        </comp1>
        <comp2>
          <template v-slot:default>默认default</template>
          <template v-slot:content>内容。。。。</template>
        </comp2>
        <comp3>
          <template v-slot:default="ctx">
            作用域插槽测试- {{ctx.foo}}
          </template>
        </comp3>
    </div>
</template>
<script>
import Comp1 from './Comp1'
import Comp2 from './Comp2'
import Comp3 from './Comp3'
export default {
  components: {
    Comp1,
    Comp2,
    Comp3
  },
  data() {
    return {
      msg: 'test slot',
      foo: 'index foo~~~~'
    }
  }
}
</script>