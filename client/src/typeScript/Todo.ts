
export type TodoCardType = {
    id: string
    name: string
    is_completed: boolean
}

export type TodoCardProps = {
    card: TodoCardType
    onDelete: (id: string) => void
    onUpdate: (id: string, data: TodoCardType) => void
}