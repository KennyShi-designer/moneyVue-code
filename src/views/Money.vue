<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <!--    <NumberPad :value='record.amount' @update:value="onUpdateAmount"/>-->
    <NumberPad :value.sync='record.amount' @submit="saveRecord"/>

    <!--    <Types :value='record.type' @update:value="onUpdateTypes"/>-->
<!--    <Types :value.sync='record.type'/>-->
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="notes">
      <For mItem field-name="备注" placeholder="在这里输入备注"
                @update.value="onUpdateNotes"/>
    </div>

    <Tags/>
    <!--    .sync意思：如果触发了'update:dataSource'事件，就会把传的数组，赋值给它之前的data-source【这】-->
    {{ count }}
    <button @click="$store.commit('increment',1)">+1</button>
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
  record: RecordItem = {tag: [], notes: '', type: '-', amount: 0}

  get recordList() {
    return this.$store.state.recordList
  }

  recordTypeList = recordTypeList

  created() {
    this.$store.commit('fetchRecords')
  }

  onUpdateNotes(value: string) {
    this.record.notes = value
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record)
  }


}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 8px 0;
}
</style>

