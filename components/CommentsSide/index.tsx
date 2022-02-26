import React, {useEffect, useState} from 'react';
import styles from "./CommentsSide.module.scss";
import classNames from "classnames";
import ArrowIcon from '@material-ui/icons/ArrowForwardIos';
import CommentItem from "./CommentItem";
import {commentsSelectors, commentsThunks} from "../../redux/slices/comments";
import {useAppSelector} from "../../redux/hooks";
import {useDispatch} from "react-redux";

const CommentsSide: React.FC = () => {
    const [activeSide, setActiveSide] = useState(true);
    const comments = useAppSelector(commentsSelectors.selectComments);
    const dispatch = useDispatch();

    const toggleActiveSide = () => {
        setActiveSide(!activeSide);
    };

    useEffect(() => {
        dispatch(commentsThunks.fetchComments());
    }, [])

    return (
        <div className={styles.commentsSide}>
            <h3 className={classNames(styles.title, {[styles.disableTitle]: !activeSide})} onClick={toggleActiveSide}>
                Комментарии
                <ArrowIcon/>
            </h3>
            <div className={styles.commentsList}>
                {activeSide && comments.map((comment, key) =>
                    key < 20 && <CommentItem key={comment.id} comment={comment}/>)}
            </div>
        </div>
    );
};

export default CommentsSide;
