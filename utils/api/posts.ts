import {AxiosInstance} from "axios";
import {PostExtendedType, PostType} from "../types/Post";
import {uri} from "../constants/apiUri";

type SearchPostDto = {
    title?: string;
    body?: string;
    views?: 'DESC' | 'ASC';
    limit?: number;
    take?: number;
    tag?: string;
};

export const PostsApi = (instance: AxiosInstance) => ({
    async getAll() {
        const { data } = await instance.get<PostExtendedType[]>(uri.posts);
        return data;
    },
    async getPostById(id: number) {
        const { data } = await instance.get<PostExtendedType>(`${uri.posts}/${id}`);
        return data;
    },
    async create(post: PostType) {
        const { data } = await instance.post(uri.posts, post);
        return data;
    },
    async update(id: number, post: PostType) {
        const { data } = await instance.patch(`${uri.posts}/${id}`, post);
        return data;
    },
    async deletePost(id: string) {
        const { data } = await instance.delete(`${uri.posts}/${id}`, {params: id});
        return data;
    },
    async searchPosts(query: SearchPostDto) {
        const { data } = await instance.get<{items: PostExtendedType[], total: number}>(`${uri.posts}/search`, {params: query});
        return data;
    },
});