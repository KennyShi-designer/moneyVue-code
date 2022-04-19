type RecordItem = {
    tag: string[],
    notes: string,
    type: string,
    amount: number,
    createAt?: Date
}
type Tag = {
    id: string
    name: string
}

type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'duplicated' | 'success'
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    remove: (id: string) => boolean
    save: () => void
}