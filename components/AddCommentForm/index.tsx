import React, {FC, useState} from 'react';
import styles from './AddCommentForm.module.scss';
import {Button, Input} from "@material-ui/core";
import {Api} from "../../utils/api";
import {CreateCommentDto} from "../../utils/api/comments";
import {CommentResponseType} from "../../utils/types/Comment";

type Props = {
    postId: number
    setCreatedComments: (newComment: CommentResponseType) => void
    incrementCommentsCount: () => void
};

const AddCommentForm: FC<Props> = ({postId, setCreatedComments, incrementCommentsCount}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [activeInput, setActiveInput] = useState(false);

    const handleActiveInput = () => {
        setActiveInput(true);
    };
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const newComment = await Api().comments.create({postId: postId, text: inputValue});
            setCreatedComments(newComment);
            incrementCommentsCount();
        } catch (e) {
            alert('Повторите попытку')
        } finally {
            setIsLoading(false);
            setInputValue('');
        }
    };

    return (
        <div className={styles.form}>
            <Input onClick={handleActiveInput}
                   classes={{ root: styles.input }}
                   minRows={activeInput ? 5 : 1}
                   placeholder={'Написать комментарий...'}
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   fullWidth
                   multiline/>
            {activeInput && <Button classes={{ root: styles.button }}
                                    disabled={isLoading}
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={handleSubmit}>Отправить</Button>}
        </div>
    );
};

export default AddCommentForm;
