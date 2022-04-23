import {clone} from "@/lib/clone";

const localStorageKeyName = 'recordList'

let data: RecordItem[] | undefined = undefined


const recordStore = {
    recordList: [] as RecordItem[],
    fetchRecords() {
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[]
        return this.recordList
    },
    saveRecords() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList))
    },
    createRecord(record: RecordItem){
        const deepClone: RecordItem = clone(record)
        deepClone.createAt = new Date().toISOString()
        this.recordList && this.recordList.push(deepClone)
        recordStore.saveRecords()
    }
}
recordStore.fetchRecords()
export {recordStore}

