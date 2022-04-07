<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" @update:value="updateTag"
                field-name="标签名" placeholder="请输入标签名："/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>

  </Layout>
</template>

<script lang="ts">

import Vue from "vue";
import {Component} from "vue-property-decorator";
import FormItem from "@/components/Money/Formitem.vue";
import Button from "@/components/Button.vue";
import {oldStore} from "@/store/index2";

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: Tag = undefined

  created() {
    this.tag = oldStore.findTag(this.$route.params.id)
    if (!this.tag) {
      this.$router.replace('/404')
    }
  }

  updateTag(name: string) {
    if (this.tag) {
      oldStore.updateTag(this.tag.id, name)
    }
  }

  remove() {
    if (this.tag) {
      if (tagStore.removeTag(this.tag.id)) {
        this.$router.back()
        window.alert('标签已删除')
      } else {
        window.alert('标签删除失败')
      }

    }
  }

  goBack() {
    this.$router.back()
  }

}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  background: white;
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
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
</style>