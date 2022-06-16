<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>

    <!--    js控制css-->
    <!--    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" height="48px"/>-->

    <div>
      <ol>
        <li v-for="group in result" :key="group.title">
          <h3 class="title">{{ beautify(group.title) }}</h3>

          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span>{{ tagString(item.tags) }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span>¥{{ item.amount }} </span>
            </li>

          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from 'dayjs'

const oneDay = 86400 * 1000
@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',')
  }

  // beautify(string: string) {
  //   const d = new Date(Date.parse(string))
  //   console.log(d)
  //
  //   const y = d.getFullYear()
  //   const m = d.getMonth()
  //   const dd = d.getDate()
  //
  //   const now = new Date()
  //
  //   if (now.getFullYear() === y && now.getMonth() === m && now.getDate() === dd) {
  //     return '今天'
  //   } else {
  //     return string
  //   }
  // }

  // beautify(string: string) {
  //   const now = new Date()
  //   if (dayjs(string).isSame(now, 'day')) {
  //     return '今天'
  //   } else if (dayjs(string).isSame(now.valueOf() - oneDay, 'day')){
  //     return '昨天'
  //   } else {
  //     return string
  //   }
  // }

  beautify(string: string) {
    const day = dayjs(string)
    const now = dayjs()
    if (day.isSame(now, 'day')) {
      return '今天'
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天'
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天'
    } else if (day.isSame(now,'year')) {
      return day.format('M月D日')
    } else {
      return day.format('YYYY年M月D日')
    }
  }


  get recordList() {
    return (this.$store.state as RootState).recordList
  }


  get result() {
    const {recordList} = this

    // 声明一个空对象的类型
    type HashTableValue = { title: string, items: RecordItem[] }
    const hashTable: { [key: string]: HashTableValue } = {}

    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createAt!.split('T')
      console.log(date)

      hashTable[date] = hashTable[date] || {title: date, items: []}
      hashTable[date].items.push(recordList[i])
    }

    console.log(hashTable)
    return hashTable
  }


  // mounted() {
  //   this.$store.commit('fetchRecords')
  // }

  beforeCreate() {
    this.$store.commit('fetchRecords')
  }

  type = '-';
  interval = 'day'

  intervalList = intervalList
  recordTypeList = recordTypeList
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: white;

    &.selected {
      background: #c4c4c4;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}

%item {
  padding: 6px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item
}

.record {
  background: white;
  @extend %item
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>