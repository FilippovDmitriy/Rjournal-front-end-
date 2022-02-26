import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import WriteForm from "../../components/WriteForm";
import {GetServerSideProps, NextPage} from "next";
import {Api} from "../../utils/api";
import {PostExtendedType} from "../../utils/types/Post";
import {wrapper} from "../../redux/store";

type Props = {
    post: PostExtendedType
}

const WriteEdit: NextPage<Props> = ({post}) => {
    return (
        <MainLayout fullWidth hideComments={true} hideMenu={true}>
            <WriteForm post={post}/>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
    const id = ctx.params?.id as string;
    const post = await Api().posts.getPostById(+id);
    const postUserId = post.user.id;
    const userAuthId = store.getState().user.data?.id;

    if (postUserId !== userAuthId) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post,
        }
    }
})

export default WriteEdit;
