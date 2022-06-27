<template>
  <nav>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="iconbiaoqian2"/>
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="iconyue1"/>
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="icongaishuai"/>
    </router-link>
    <div class="space"/>
  </nav>
</template>

<script lang="ts">

export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  height: 50px;
  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected{
    .icon {
      width: 44px;
      height: 44px;
    }
    transition: all 1s;
  }
  &::before {
    content: '';
    position: absolute;
    bottom: 48px;
    left: 0;
    width: 100%;
    height: 6px;
    border-radius: 50%;
    background: $mainColor;
  }

}
</style>
