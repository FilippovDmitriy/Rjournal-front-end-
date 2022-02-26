import type {GetServerSideProps, NextPage} from 'next'
import React from "react";
import Post from "../components/Post";
import MainLayout from "../layouts/MainLayout";
import {Api} from "../utils/api";
import {wrapper} from "../redux/store";
import {selectPosts, setPosts} from '../redux/slices/posts';
import {useAppSelector} from "../redux/hooks";

const Home: NextPage = () => {
    const posts = useAppSelector(selectPosts);
    return (
        <MainLayout>
            {posts?.map((post, id) =>
                <Post key={post.id}
                      title={post.title}
                      description={post.description}
                      postId={post.id}
                      userId={post.user.id}
                      postBody={post.body}/>)}
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
    const fetchedPosts = await Api().posts.getAll();
    store.dispatch(setPosts(fetchedPosts));
    return {
        props: {}
    }
});

export default Home;