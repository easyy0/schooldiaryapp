export type MessagesTableHeadCell = {
    id: string,
    label?: string,
    align?: "left" | "center" | "right" | "justify" | "inherit" | undefined,
    width?: any,
    minWidth?: any
}

export const MESSAGES_TABLE_HEAD_STRUCTURE : MessagesTableHeadCell[] = [
    { id: "sender",label: "messages:SENDER" },
    { id: "title", label: "global:TITLE" },
    { id: "type", label: "global:TYPE" },
    {
        id: "date",
        label: "global:DATE",
        align: "center",
    },
    { id: "" },
]