import React from 'react';
import style from "./Comment.module.scss";
import {Avatar, Typography} from "@material-ui/core";
import {CommentResponseType} from "../../utils/types/Comment";
import Link from "next/link";

type Props = {
    comment: CommentResponseType
}

const Comment: React.FC<Props> = ({comment}) => {
    return (
        <div className={style.comment}>
            <div className={style.user}>
                <Link href={`/profile/${comment.user.id}`}>
                    <a className={style.userLink}>
                        <Avatar className={'miniAva'}>{comment.user.fullName[0]}</Avatar>
                        <div className={style.userInfo}>
                            <Typography variant={'h6'}>{comment.user.fullName}</Typography>
                            <span>{comment.createdAt.slice(0, 10)}</span>
                        </div>
                    </a>
                </Link>
            </div>
            <div className={style.textComment}>{comment.text}</div>
        </div>
    );
};

export default Comment;
