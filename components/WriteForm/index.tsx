import React, {FC, useState} from 'react';
import styles from "./WriteForm.module.scss";
import {Button, Input} from "@material-ui/core";
import dynamic from "next/dynamic";
import {OutputData} from "@editorjs/editorjs";
import {selectIsLoading, sendPost, updatingPost} from '../../redux/slices/posts';
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../redux/hooks";
import {PostExtendedType} from "../../utils/types/Post";
import {useRouter} from "next/router";

const Editor = dynamic(() => import('../Editor'), {ssr: false})

type Props = {
    post?: PostExtendedType
}

const WriteForm: FC<Props> = ({post}) => {
    const [title, setTitle] = useState(post?.title || '');
    const [blocks, setBlocks] = useState<OutputData['blocks']>(post?.body || []);
    const isLoading = useAppSelector(selectIsLoading);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const fetchedPost = {title: title, body: blocks};
        dispatch(sendPost(fetchedPost));
        router.push('/');
    };
    const handleUpdate = () => {
        if (post) {
            const fetchedPost = {title, body: blocks};
            dispatch(updatingPost({id: post.id, post: fetchedPost}));
            router.push('/');
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Input placeholder={'Заголовок'}
                       value={title}
                       onChange={e => setTitle(e.target.value)}
                       classes={{ root: styles.titleField }}
                       fullWidth/>
                <div className={styles.editor}>
                    <Editor setBlocks={setBlocks} initialBlocks={post?.body}/>
                </div>
                <Button variant='contained'
                        onClick={post ? handleUpdate : handleSubmit}
                        disabled={isLoading || !title || blocks.length === 0}
                        className={styles.button}
                        color={'primary'}>{post ? 'Сохранить' : 'Опубликовать'}</Button>
            </div>
        </div>
    );
};

export default WriteForm;
