<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <!--    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>-->

    <!--    js控制css-->
    <!--    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" height="48px"/>-->


    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <!--        {{group}}-->
        <!--        {{index}}-->
        <h3 class="title">{{ beautify(group.title) }}<span>¥{{ group.total }}</span></h3>

        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span class="tags">{{ tagString(item.tag) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>¥{{ item.amount }} </span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>

    <!--    <div>-->
    <!--      <ol>-->
    <!--        <li v-for="group in groupedList" :key="group.title">-->
    <!--          <h3 class="title">{{ beautify(group.title) }}</h3>-->

    <!--          <ol>-->
    <!--            <li v-for="item in group.items" :key="item.id" class="record">-->
    <!--              <span>{{ tagString(item.tags) }}</span>-->
    <!--              <span class="notes">{{ item.notes }}</span>-->
    <!--              <span>¥{{ item.amount }} </span>-->
    <!--            </li>-->

    <!--          </ol>-->
    <!--        </li>-->
    <!--      </ol>-->
    <!--    </div>-->
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from 'dayjs'
import {clone} from "@/lib/clone";

// const oneDay = 86400 * 1000
@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  tagString(tag: Tag[]) {
    // console.log(tags)
    return tag.length === 0 ? '无' : tag.map(t => t.name).join(',')
    // console.log(tags)
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
  //   const now = new Date()0
  //   if (dayjs(string).isSame(now, 'day')) {
  //     return '今天'
  //   } else if (dayjs(string).isSame(now.valueOf() - oneDay, 'day')){ // now是一个对象
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
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日')
    } else {
      return day.format('YYYY年M月D日')
    }
  }


  get recordList() {
    return (this.$store.state as RootState).recordList
  }

  // result 是哈希表「对象」
  get groupedList() {
    const {recordList} = this


    // 声明一个空对象的类型
    // type HashTableValue = { title: string, items: RecordItem[] }
    // const hashTable: { [key: string]: HashTableValue } = {}
    // console.log(recordList.map(i => i.createAt))

    // 排序 recordList
    const newList = clone((recordList
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf())))

    if (newList.length === 0) {
      return []
    }

    type Result = { title: string, total?: number, items: RecordItem[] }[]

    const result: Result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}]

    for (let i = 1; i < newList.length; i++) {
      const current = newList[i]
      const last = result[result.length - 1]
      if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
        last.items.push(current)
      } else {
        result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]})
      }
    }

    result.map(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0)
    })
    return result

    // for (let i = 0; i < recordList.length; i++) {
    //   const [date, time] = recordList[i].careateAt!.split('T')
    //   hashTable[date] = hashTable[date] || {title: date, items: []}
    //   hashTable[date].items.push(recordList[i])
    // }
    // return hashTable
  }


  // mounted() {
  //   this.$store.commit('fetchRecords')
  // }

  beforeCreate() {
    this.$store.commit('fetchRecords')
  }

  type = '-';
  // interval = 'day'
  //
  // intervalList = intervalList
  recordTypeList = recordTypeList
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.noResult {
  padding: 16px;
  text-align: center;
}

::v-deep {
  .type-tabs-item {
    background: white;

    &.selected {


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