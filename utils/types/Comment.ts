import {UserType} from "./User";

export type CommentResponseType = {
    id: number
    text: string
    createdAt: string
    updatedAt: string
    user: UserType
    post: {
        id: number
        title: string
    }
}