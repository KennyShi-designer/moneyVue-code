type RootState = {
    recordList: RecordItem[],
    createRecordError?: Error | null,
    createTagError: Error | null
    tagList: Tag[],
    currentTag?: Tag
}


type RecordItem = {
    tag: Tag[],
    notes: string,
    type: string,
    amount: number
    createAt?: string
}


type Tag = {
    id: string
    name: string
}

// type TagListModel = {
//     data: Tag[]
//     fetch: () => Tag[]
//     create: (name: string) => 'duplicated' | 'success'
//     update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
//     remove: (id: string) => boolean
//     save: () => void
// }