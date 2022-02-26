import React, {FC, useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import FullPost from "../../components/FullPost";
import PostComments from "../../components/PostComments";
import {PostExtendedType} from "../../utils/types/Post";
import {GetServerSideProps} from "next";
import {Api} from "../../utils/api";
import {CommentResponseType} from "../../utils/types/Comment";

type Props = {
    post: PostExtendedType
    comments: CommentResponseType[]
}

const News:FC<Props> = ({post, comments}) => {
    const [commentsCount, setCommentsCount] = useState(comments.length);
    return (
        <MainLayout maxWidth>
            <FullPost post={post} commentsCount={commentsCount}/>
            <PostComments post={post}
                          comments={comments}
                          commentsCount={commentsCount}
                          setCommentsCount={setCommentsCount}/>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const id = ctx.params?.id as string;
    const post = await Api().posts.getPostById(+id);
    if (!post) {
        return {
            notFound: true
        }
    }
    const comments = await Api().comments.getAll(+id);
    return {
        props: {
            post,
            comments
        }
    }
}

export default News;
