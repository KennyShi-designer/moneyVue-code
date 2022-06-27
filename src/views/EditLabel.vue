<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="iconfanhui" @click="goBack"/>
      <div class="title">
        <Icon name="iconbianji"/>
        <span>编辑标签</span>
      </div>
      <span class="rightIcon"/>
    </div>
    <div class="form-wrapper">
      <FormItem :value="currentTag.name" @update:value="update"
                field-name="标签名" placeholder="请输入标签名："/>
    </div>
    <div class="button-wrapper">
      <Icon name="iconshanchu" @click="remove"/>
    </div>

  </Layout>
</template>

<script lang="ts">

import Vue from "vue";
import {Component} from "vue-property-decorator";
import FormItem from "@/components/Money/Formitem.vue";
import Button from "@/components/Button.vue";


@Component({
  components: {Button, FormItem},
})
export default class EditLabel extends Vue {
  get currentTag() {
    return this.$store.state.currentTag
  }

  created() {
    const id = this.$route.params.id
    this.$store.commit('fetchTags')
    this.$store.commit('setCurrentTag',id)
    // this.tag = this.$store.commit('fetchTags',this.$route.params.id)
    if (!this.currentTag) {
      this.$router.replace('/404')
    }
  }

  update(name: string) {
    if (this.currentTag) {
      this.$store.commit('updateTag',{id:this.currentTag.id, name})
    }
  }

  remove() {
    if (this.currentTag) {
      this.$store.commit('removeTag',this.currentTag.id)
    }
  }

  goBack() {
    this.$router.back()
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;

  border-radius: 14px;
  justify-content: space-between;

  > .leftIcon {
    width: 24px;
    height: 24px;
  }


  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  margin-top: 8px;
  ::v-deep .formItem {
    background: $thirdColor;
  }
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
  .icon {
    width: 40px;
    height: 40px;
  }
}
</style>