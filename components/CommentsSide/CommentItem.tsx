import React from 'react';
import styles from './CommentsSide.module.scss';
import Link from "next/link";
import {CommentResponseType} from "../../utils/types/Comment";
import {Avatar} from "@material-ui/core";

type Props = {
    comment: CommentResponseType
};

const CommentItem: React.FC<Props> = ({comment}) => {
    return (
        <div className={styles.commentItem}>
            <div className={styles.commentItem__top}>
                <Link href={`/profile/${comment.user.id}`}>
                    <a>
                        <Avatar className={styles.ava}>{comment.user.fullName[0]}</Avatar>
                        <div className={styles.commentItem__name}>{comment.user.fullName}</div>
                    </a>
                </Link>
                <div className={styles.commentItem__time}>{comment.createdAt.slice(0, 10)}</div>
            </div>
            <div className={styles.commentItem__text}>{comment.text}</div>
            <div className={styles.commentItem__article}>
                <Link href={`/news/${comment.post.id}`}>
                    <a>{comment.post.title}</a>
                </Link>
            </div>
        </div>
    );
};

export default CommentItem;
