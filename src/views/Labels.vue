<template>
  <Layout>
    <div class="navBar">
      <Icon name="iconbianji"/>
      <span>标签</span>
    </div>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" key="tag.id"
                   :to='`/labels/edit/${tag.id}`'>
        <Icon name="iconbiaoqian2"/>
        <span>{{ tag.name }}</span>

      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Icon name="icontianjia" class="createTag" @click="createTag"/>
    </div>
  </Layout>
</template>

<script lang="ts">

import Vue from "vue";
import {Component} from "vue-property-decorator";
import {mixins} from "vue-class-component";
import {TagHelper} from "@/mixins/TagHelper";



@Component
export default class Labels extends  mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList
  }

  beforeCreate() {
    this.$store.commit('fetchTags')
  }

};
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
}
.tags {
  font-size: 16px;
  padding: 6px;
  display: flex;
  flex-wrap: wrap;


  > .tag {
    border-radius: 68px;
    background: white;
    overflow: hidden;
    padding: 10px;
    margin: 10px;
    position: relative;

    .icon {
      width: 14px;
      height: 14px;
      position: absolute;
      top: 1px;
    }
  }
}

.createTag-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
  .icon {
    width: 40px;
    height: 40px;
  }
}
</style>