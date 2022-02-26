import React, {useEffect, useState} from 'react';
import style from './PostComments.module.scss';
import {Paper, Typography} from "@material-ui/core";
import Comment from "../Comment";
import AddCommentForm from "../AddCommentForm";
import {PostExtendedType} from "../../utils/types/Post";
import {CommentResponseType} from "../../utils/types/Comment";
import {declOfNum} from "../../utils/functions/declOfNum";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";

type Props = {
    post: PostExtendedType
    comments: CommentResponseType[]
    commentsCount: number
    setCommentsCount: (commentsCount: number) => void
};

const PostComments: React.FC<Props> = ({post, comments, commentsCount, setCommentsCount}) => {
    const [createdComments, setCreatedComments] = useState<CommentResponseType[]>([]);

    const userAuthData = useAppSelector(selectUserData);

    return (
        <Paper className={style.postComments} elevation={0}>
            <div className={style.container}>
                <Typography variant={'h5'} className={style.countComments}>
                    {commentsCount + ' ' + declOfNum(commentsCount, ['комментарий', 'комментария', 'комментариев'])}
                </Typography>
                {userAuthData && <AddCommentForm postId={post.id}
                                                 setCreatedComments={(newComment: CommentResponseType) => {
                                                     setCreatedComments([newComment, ...createdComments])
                                                 }}
                                                 incrementCommentsCount={() => setCommentsCount(commentsCount + 1)}
                />}
                <div className={style.comments}>
                    {createdComments.reverse().map(comment => <Comment comment={comment} key={comment.id}/>)}
                    {comments.map(comment => <Comment comment={comment} key={comment.id}/>)}
                </div>
            </div>
        </Paper>
    );
};

export default PostComments;
