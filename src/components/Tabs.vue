<template>
  <ul class="tabs" :class="{[classPrefix +'-tabs']:classPrefix}">

    <li v-for="item in dataSource" :key="item.value"
        class="tabs-item" :class="liClass(item)"
        @click="select(item)">{{ item.text }}
      <!--      js控制css-->
      <!--    <li v-for="item in dataSource" :key="item.value"-->
      <!--        class="tabs-item" :class="liClass(item)" :style="{height:height+ 'px'}"-->
      <!--        @click="select(item)">{{ item.text }}-->
    </li>
    <!--        :class="{[classPrefix+'-tabs-item']:classPrefix,selected:item.value === value}"-->
  </ul>

</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";


type DataSourceItem = { text: string, value: string }

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array}) dataSource!: DataSourceItem[]
  // value表示选中的那一项
  @Prop(String) readonly value!: string

  // classPrefix表示css类前缀
  @Prop(String) classPrefix?: string

  // // js控制css
  // @Prop({type:String,default:'64px'}) height!: string


  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + '-tabs-item']: this.classPrefix, selected: item.value === this.value
    }
  }


  // 放在原型上
  select(item: DataSourceItem) {
    this.$emit('update:value', item.value)
  }

  // // 放在对象本身上
  // select=(item: DataSourceItem) =>{
  //   this.$emit('update:value', item.value)
  // }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tabs {
  //background:$mainColor;
  display: flex;
  text-align: center;
  font-size: 24px;

  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 0;
      width: 100%;
      height: 6px;
      border-radius: 50%;
      background: $mainColor;
    }
  }
}

</style>