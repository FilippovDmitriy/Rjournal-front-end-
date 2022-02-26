import React, {useEffect, useState} from 'react';
import {Button, IconButton, Paper} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import CreateIcon from '@material-ui/icons/CreateOutlined';
import styles from "./Header.module.scss"
import Link from "next/link";
import HeaderClient from "./HeaderClient";
import AuthPopup from "../AuthPopup";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {selectIsVisibleLeftSide, setIsVisibleLeftSide} from "../../redux/slices/mainLayout";
import SearchBox from "../SearchBox";
import Logo from "../Logo";
import {md2, md4} from "../../utils/constants/widthVariables";
import SearchBoxMobile from "../SearchBox/SearchBoxMobile";
import {useMediaQuery} from 'react-responsive';

const Header: React.FC = () => {
    const [isOpenAuthPopup, setIsOpenAuthPopup] = useState(false);

    const isVisibleLeftSide = useAppSelector(selectIsVisibleLeftSide);
    const userData = useAppSelector(selectUserData);
    const dispatch = useAppDispatch();

    let isMd2 = useMediaQuery({query: `(max-width: ${md2}px)`});
    let isMd4 = useMediaQuery({query: `(max-width: ${md4}px)`});

    const toggleIsVisibleLeftSide = () => {
        dispatch(setIsVisibleLeftSide(!isVisibleLeftSide));
    };

    return (
        <Paper classes={{root: styles.root}} className={'mui-fixed'} elevation={0}>
            <div className={styles.headerMain}>
                <div className={styles.headerIcons}>
                    <IconButton onClick={toggleIsVisibleLeftSide}>
                        <MenuIcon/>
                    </IconButton>
                    <Logo/>
                </div>
                <div className={styles.postActions}>
                    <SearchBoxMobile/>
                    <div className={styles.searchBoxContainer}>
                        <SearchBox/>
                    </div>
                    <Link href={userData ? '/write' : ''}>
                        <a>
                            <Button onClick={() => !userData && setIsOpenAuthPopup(true)}
                                    variant="contained"
                                    className={styles.button}>
                                <CreateIcon className={styles.buttonIcon}/>
                                <p>Новая запись</p>
                            </Button>
                        </a>
                    </Link>
                </div>
            </div>
            <div className={styles.authContainer}>
                {userData
                    ? <HeaderClient fullName={userData.fullName} profileId={userData.id}/>
                    : <AuthPopup isOpen={isOpenAuthPopup} setIsOpen={setIsOpenAuthPopup} userData={userData}/>}
            </div>
        </Paper>
    );
};

export default Header;
