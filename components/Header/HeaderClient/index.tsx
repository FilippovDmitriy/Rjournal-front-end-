import React, {MouseEvent, useState} from 'react';
import styles from "./HeaderClient.module.scss";
import {Avatar, IconButton, Menu, MenuItem} from "@material-ui/core";
import Link from "next/link";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {setValueCookie} from "../../../utils/functions/setCookie";
import {useRouter} from "next/router";

type Props = {
    fullName: string
    profileId: number
};

const HeaderClient: React.FC<Props> = ({fullName, profileId}) => {
    type anchorEl = HTMLButtonElement | null;

    const [anchorEl, setAnchorEl] = useState<anchorEl>(null);
    const router = useRouter();
    const open = Boolean(anchorEl);

    const handleAnchor = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const deleteCookie = () => {
        setValueCookie('authToken', '');
        router.push('/')
    };

    return (
        <div className={styles.headerClient}>
            <Link href={'/profile/[id]'} as={`/profile/${profileId}`}>
                <a className={styles.avaLink}>
                    <Avatar className={styles.avatar}>{fullName[0]}</Avatar>
                </a>
            </Link>
            <IconButton onClick={handleAnchor}>
                <ArrowDownIcon/>
            </IconButton>
            <Menu anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  elevation={3} keepMounted>
                <MenuItem>
                    <Link href={`/profile/${profileId}`}>
                        <a className={styles.menuLink}>
                            <Avatar className={styles.miniAvatar}>{fullName[0]}</Avatar>
                            {fullName}
                        </a>
                    </Link>
                </MenuItem>
                <MenuItem className={styles.menuLink} onClick={deleteCookie}>
                    <ExitToAppIcon/>
                    Выход
                </MenuItem>
            </Menu>
        </div>
    );
};

export default HeaderClient;
