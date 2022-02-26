import React, {FC} from 'react';
import style from "./FullPost.module.scss";
import {Avatar, Button, Paper, Typography} from "@material-ui/core";
import ChatIcon from '@material-ui/icons/ChatOutlined';
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import PostAction from "../PostAction";
import classNames from "classnames";
import {PostExtendedType} from "../../utils/types/Post";
import {useMediaQuery} from "react-responsive";
import {md4} from "../../utils/constants/widthVariables";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";

type Props = {
    commentsCount: number
    post: PostExtendedType
}

const FullPost: FC<Props> = ({post, commentsCount}) => {
    const isMd4 = useMediaQuery({ query: `(max-width: ${md4}px)` });
    const userData = useAppSelector(selectUserData);

    return (
        <Paper elevation={0} className={style.wrapper}>
            <div className={classNames(style.container, style.top)}>
                <Typography variant={'h2'}>{post.title}</Typography>
                <Typography>{post.description}</Typography>
            </div>
            <div className={style.content}>
                {post.body.map((item, key) => <React.Fragment key={item.id}>
                    {(key !== 0 && item.type === "paragraph") &&
                    <Typography dangerouslySetInnerHTML={{__html: item.data.text}}
                                className={classNames({[style.container]: item.data.type !== 'image'})}/>}
                    {(item.type === 'image') && <img src={item.data.url} alt={item.data.caption}/>}
                </React.Fragment>)}
            </div>
            <div className={style.container}>
                <PostAction commentsCount={commentsCount} postId={post.id}/>
            </div>
            <div className={classNames(style.userContainer, style.container)}>
                <div className={style.user} id={`comments/${post.id}`}>
                    <Link href={`/profile/${post.user.id}`}>
                        <a>
                            <Avatar>{post.user.fullName[0]}</Avatar>
                            <div className={style.userInfo}>
                                <div className={style.userName}>
                                    <Typography variant={'h5'}>{post.user.fullName}</Typography>
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className={style.buttons}>
                    <Button variant="contained"><ChatIcon/><p>Написать</p></Button>
                    {userData && <Button variant="contained" color={'primary'}><AddIcon/><span>Подписаться</span></Button>}
                </div>
            </div>
        </Paper>
    );
};

export default FullPost;
