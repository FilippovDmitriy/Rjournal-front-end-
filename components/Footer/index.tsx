import React, {MouseEvent, useState} from 'react';
import styles from "./Footer.module.scss";
import HomeIcon from '@material-ui/icons/HomeOutlined';
import {Avatar, IconButton, Menu, MenuItem} from "@material-ui/core";
import Link from "next/link";
import classNames from "classnames";
import {useRouter} from "next/router";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {setValueCookie} from "../../utils/functions/setCookie";
import AuthPopup from "../AuthPopup";

const Footer = () => {
    type anchorEl = HTMLButtonElement | null;

    const [isOpenAuthPopup, setIsOpenAuthPopup] = useState(false);
    const [anchorEl, setAnchorEl] = useState<anchorEl>(null);
    const router = useRouter();
    const {pathname} = router;
    const open = Boolean(anchorEl);

    const userData = useAppSelector(selectUserData);

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
        <footer className={styles.root}>
            <div className={styles.icons}>
                <IconButton className={classNames(styles.icon, {[styles.activeLink]: pathname === '/'})}>
                    <Link href={'/'}>
                        <a><HomeIcon/></a>
                    </Link>
                </IconButton>
                {userData
                    ? <IconButton onClick={handleAnchor}>
                        <Avatar className={'miniAva'}>{userData?.fullName[0]}</Avatar>
                      </IconButton>
                    : <AuthPopup isOpen={isOpenAuthPopup} setIsOpen={setIsOpenAuthPopup} userData={userData}/>
                }
                <Menu anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      elevation={3} keepMounted>
                    <MenuItem>
                        <Link href={`/profile/${userData?.id}`}>
                            <a className={styles.menuLink}>
                                <Avatar className={styles.miniAvatar}>{userData?.fullName[0]}</Avatar>
                                {userData?.fullName}
                            </a>
                        </Link>
                    </MenuItem>
                    <MenuItem className={styles.menuLink} onClick={deleteCookie}>
                        <ExitToAppIcon/>
                        Выход
                    </MenuItem>
                </Menu>
            </div>
        </footer>
    );
};

export default Footer;