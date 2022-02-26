import {OutputData} from "@editorjs/editorjs";
import {UserType} from "./User";

export type PostType = {
    title: string
    body: OutputData['blocks']
}

export type PostExtendedType = {
    tags: string | null
    id: number
    views: number
    createdAt: string
    updatedAt: string
    description: string
    user: UserType
} & PostType;