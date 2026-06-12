import { User } from "./User";

export type Message = {
    id: number,
    title: string,
    sender: User,
    type: MessageType,
    date: Date,
    status: MessageStatus,
    recipients: MessageRecipient[],
    archived: boolean,
    description?: string,
}

export type MessageRecipient = {
    id: number,
    recipient: User
}

export type MessageOrderDirection = "asc" | "desc" | undefined

export enum MessageType {
    DEFAULT = "DEFAULT",
    IMPORTANT = "IMPORTANT",
}

export enum MessageStatus {
    READ = "READ",
    UNREAD = "UNREAD",
    SENT = "SENT"
}