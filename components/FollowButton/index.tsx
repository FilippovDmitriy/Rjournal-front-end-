import React, {useState} from 'react';
import style from "./FollowButton.module.scss";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from '@material-ui/icons/Done';
import {Button} from "@material-ui/core";

const FollowButton: React.FC = () => {
    const [followed, setFollowed] = useState(false);

    return (
        <Button onClick={() => setFollowed(!followed)} className={style.button} variant={'contained'}>
            {followed ? <DoneIcon style={{color: "green"}}/> : <AddIcon/>}
        </Button>
    );
};

export default FollowButton;
