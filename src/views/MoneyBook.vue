<template>
  <Layout class-prefix="layout">

    <div class="nav">
      <div>
        <Icon name="iconwenjianjia" class="leftIcon"/>
        <span>记账本</span>
      </div>

      <Icon name="iconshezhi" @click="setting"/>
    </div>
    <div class="add" @click="tomoney">
      <span>记一笔</span>
    </div>
  </Layout>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class MoneyBook extends Vue {
  tomoney() {
    this.$router.replace('/money')
  }
  setting() {
    window.alert('此功能暂未开放')
  }

};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
::v-deep .layout-content {
  display: flex;
  flex-direction: column;

  .nav {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    .icon {
      width: 20px;
      height: 20px;
    }
    span {
      padding: 4px;
    }

  }

  .add {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $thirdColor;
    margin: 10px 20px;
    border-radius: 14px;
  }
}

</style>
