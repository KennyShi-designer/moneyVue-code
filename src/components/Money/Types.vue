<template>
  <div>
    <ul class="types">
      <!--      完整写法-->
      <li :class="type === '-' ?  'selected' :''"
          @click="selectType('-')">支出
      </li>

      <!--      vue智能化后的简写-->
      <li :class="type === '+' && 'selected'"
          @click="selectType('+')">收入
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Types',
  props: ['xxx'],  // 外部属性
  data() {   // 内部属性
    return {
      type: '-' // '-'表示支出，'+'表示收入
    }
  },
  mounted() {  // 生命周期
    console.log(this.xxx)
  },
  methods: {   // 方法
    selectType(type) { // type 只能是 '-' 和 '+' 中的一个
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown')
      }
      this.type = type
    }
  }
}
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}

</style>