import {GetServerSidePropsContext, NextPageContext} from "next";
import Cookies, {parseCookies} from "nookies";
import axios from "axios";
import {UserApi} from "./users";
import {PostsApi} from "./posts";
import {CommentsApi} from "./comments";
import {uri} from "../constants/apiUri";

type ApiReturnType = {
    users: ReturnType<typeof UserApi>,
    posts: ReturnType<typeof PostsApi>,
    comments: ReturnType<typeof CommentsApi>,
}

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
    const cookies = ctx ? Cookies.get(ctx) : parseCookies();
    const token = cookies.authToken;

    const instance = axios.create({
        baseURL: uri.base,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });

    return {
        users: UserApi(instance),
        posts: PostsApi(instance),
        comments: CommentsApi(instance),
    }
}