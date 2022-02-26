import React, {FC, MouseEvent, useEffect, useState} from 'react';
import styles from "./Post.module.scss";
import {Menu, MenuItem, Paper, Typography} from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Link from "next/link";
import PostAction from "../PostAction";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {selectUserAuthId} from "../../redux/slices/user";
import {GetServerSideProps} from "next";
import {Api} from "../../utils/api";
import {OutputData} from "@editorjs/editorjs";
import {deletingPost} from "../../redux/slices/posts";
import {useDispatch} from "react-redux";

type Props = {
    title: string
    description: string
    postId: number
    userId: number
    postBody: OutputData['blocks']
}

const Post: FC<Props> = ({title, description, postId, userId, postBody}) => {
    type anchorEl = HTMLButtonElement | null;

    const [anchorEl, setAnchorEl] = useState<anchorEl>(null);
    const [commentsCount, setCommentsCount] = useState(0);
    const open = Boolean(anchorEl);

    const userAuthId = useAppSelector(selectUserAuthId);
    const dispatch = useDispatch();

    const handleAnchor = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleDeletePost = () => {
        dispatch(deletingPost({postId}));
        setAnchorEl(null);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const descriptionImage = postBody.find(itemBody => itemBody.type === 'image');

    useEffect(() => {
        (async () => {
            const comments = await Api().comments.getAll(+postId);
            setCommentsCount(comments.length);
        })()
    }, [])

    return (
        <Paper elevation={0} className={styles.paper}>
            <div className={styles.top}>
                <Link href={'/news/[id]'} as={`/news/${postId}`}>
                    <a>
                        <Typography variant={'h4'} className={styles.title}>{title}</Typography>
                    </a>
                </Link>
                {userId === userAuthId &&
                    <span className={styles.moreIcon} onClick={handleAnchor}><MoreHorizIcon/></span>
                }
                <Menu anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      elevation={3} keepMounted>
                    <MenuItem>
                        <Link href={`/write/${postId}`}>
                            <a className={styles.menuLink}>Редактировать</a>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleDeletePost}>Удалить</MenuItem>
                </Menu>
            </div>
            <Link href={'/news/[id]'} as={`/news/${postId}`}>
                <a className={styles.descriptionLink}>
                    <Typography className={styles.text}>{description}</Typography>
                    {descriptionImage && <img src={descriptionImage?.data.url} alt={descriptionImage?.data.caption}/>}
                </a>
            </Link>
            <div className={styles.bottomBlock}>
                <PostAction commentsCount={commentsCount} postId={postId}/>
            </div>
        </Paper>
    );
};

export default Post;
