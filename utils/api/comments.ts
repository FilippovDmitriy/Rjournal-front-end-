import {AxiosInstance} from "axios";
import {CommentResponseType} from "../types/Comment";
import {uri} from "../constants/apiUri";

export type CreateCommentDto = {
    postId: number
    text: string
}

export const CommentsApi = (instance: AxiosInstance) => ({
    async getAll(postId?: number) {
        const { data } = await instance.get<CommentResponseType[]>(uri.comments, { params: { postId } });
        return data;
    },
    async create(createdComment: CreateCommentDto) {
        const { data } = await instance.post<CommentResponseType>(uri.comments, createdComment);
        return data;
    }
})