import React from 'react';
import styles from "./PostAction.module.scss";
import {IconButton} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import RepeatIcon from "@material-ui/icons/Repeat";
import BookmarkIcon from "@material-ui/icons/BookmarkBorderRounded";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Link from "next/link";

type Props = {
    commentsCount: number
    postId: number
}

const PostAction: React.FC<Props> = ({commentsCount, postId}) => {
    return (
        <div className={styles.postAction}>
            <IconButton className={styles.icon}>
                <Link href={`/news/${postId}#comments/${postId}`}>
                    <a>
                        <ChatIcon/>
                        <p>{commentsCount > 0 && commentsCount}</p>
                    </a>
                </Link>
            </IconButton>
            <IconButton className={styles.icon}>
                <RepeatIcon/>
            </IconButton>
            <IconButton className={styles.icon}>
                <BookmarkIcon/>
            </IconButton>
            <IconButton className={styles.icon}>
                <ArrowUpwardIcon/>
            </IconButton>
        </div>
    );
};

export default PostAction;
