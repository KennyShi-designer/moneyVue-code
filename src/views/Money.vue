<template>
  <Layout class-prefix="layout">
    <!--        {{ recordList }}-->

    <!--    <NumberPad :value='record.amount' @update:value="onUpdateAmount"/>-->

    <NumberPad :value.sync='record.amount' @submit="saveRecord"/>


    <!--    .sync意思：如果触发了'update:dataSource'事件，就会把传的数组，赋值给它之前的data-source【这】-->
    <!--    {{ count }}-->
    <!--    <button @click="$store.commit('increment',1)">+1</button>-->


    <!--    <Types :value='record.type' @update:value="onUpdateTypes"/>-->
    <!--    <Types :value.sync='record.type'/>-->
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>


    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes"/>
    </div>

    <div class="tag">
      <Tags @update:value="record.tag = $event"/>
    </div>

    <div class="nav">
      <div class="iconNav">
        <Icon name="iconfanhui" class="goBack" @click="goBack"/>
        <Icon name="icongengduo" class="more" @click="more"/>
      </div>

    </div>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue'
import FormItem from '@/components/Money/Formitem.vue'
import Tags from '@/components/Money/Tags.vue'
import Vue from 'vue'
import {Component, Watch} from "vue-property-decorator";

import store from "@/store";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";


@Component({
  components: {Tabs, Tags, FormItem, NumberPad},
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList
  }

  record: RecordItem = {tag: [], notes: '', type: '-', amount: 0}

  recordTypeList = recordTypeList

  created() {
    this.$store.commit('fetchRecords')
  }

  onUpdateNotes(value: string) {
    this.record.notes = value
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record)
    if (this.$store.state.createRecordError === null) {
      window.alert('已保存')
      this.record.tag = []
      this.record.notes = ''

    }
  }

  goBack() {
    this.$router.replace('/moneyBook')
  }

  more() {
    window.alert('此功能暂未开放')
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
  position: relative;
}

.notes {
  padding: 8px 0;
}

.tag {
  margin: 0 10px;
}

.nav {
  width: 100%;
  content: '';
  position: absolute;
  top: 12px;
  .iconNav{
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
  }
  .icon {
    width: 20px;
    height: 20px;
  }


}

.nav::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 6px;
  border-radius: 50%;
  background: $mainColor;
}


</style>

