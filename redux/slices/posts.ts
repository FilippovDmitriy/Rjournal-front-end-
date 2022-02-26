import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppState} from "../store";
import {Api} from "../../utils/api";
import {PostExtendedType, PostType} from "../../utils/types/Post";
import {HYDRATE} from "next-redux-wrapper";

const initialState = {
    isLoading: false as boolean,
    posts: null as PostExtendedType[] | null
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, action) => {
            state.posts?.push(action.payload);
        },
        updatePost: (state, action) => {
            const desPost = state.posts?.find(post => post.id === action.payload.id) as PostExtendedType;
            let indexOfDesPost = state.posts?.indexOf(desPost) as number;
            if (state.posts) {
                state.posts[indexOfDesPost] = action.payload.post;
            }
        },
        deletePost: (state, action) => {
            const desPost = state.posts?.find(post => post.id === action.payload.postId) as PostExtendedType;
            const indexOfDesPost = state.posts?.indexOf(desPost) as number;
            state.posts?.splice(indexOfDesPost, 1);
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.posts = action.payload.posts.posts
        },
    },
})

export const sendPost = createAsyncThunk(
    'posts/sendPost',
    async (post: PostType, {dispatch}) => {
        dispatch(setIsLoading(true));
        await Api().posts.create(post);
        dispatch(addPost(post));
        dispatch(setIsLoading(false));
    }
);
export const updatingPost = createAsyncThunk(
    'posts/updatingPost',
    async (payload: updatePostPayload, {dispatch}) => {
        dispatch(setIsLoading(true));
        await Api().posts.update(payload.id, payload.post);
        dispatch(updatePost({id: payload.id}));
        dispatch(setIsLoading(false));
    }
);
export const deletingPost = createAsyncThunk(
    'posts/deletingPost',
    async (payload: { postId: number }, {dispatch}) => {
        dispatch(setIsLoading(true));
        await Api().posts.deletePost(String(payload.postId));
        dispatch(deletePost({postId: payload.postId}));
        dispatch(setIsLoading(false));
    }
)

type updatePostPayload = {
    id: number,
    post: PostType
}

export const {setPosts, addPost, updatePost, setIsLoading, deletePost} = postsSlice.actions;
export const selectPosts = (state: AppState) => state.posts.posts;
export const selectIsLoading = (state: AppState) => state.posts.isLoading;
export const postsReducer = postsSlice.reducer;