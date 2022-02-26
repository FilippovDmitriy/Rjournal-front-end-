import React, {useEffect, useRef, useState} from 'react';
import styles from "./SearchBoxMobile.module.scss";
import SearchIcon from "@material-ui/icons/Search";
import {IconButton} from "@material-ui/core";
import SearchBox from "../index";
import classNames from "classnames";
import {handlerDocumentOutsideClick} from "../../../utils/functions/handleOutsideClick";

const SearchBoxMobile = () => {
    const [isActive, setIsActive] = useState(false);
    const searchBoxMobile = useRef(null);

    const toggleIsActive = () => {
        setIsActive(!isActive)
    };
    const handlerOutsideSearchBoxClick = (e: any) => {
        handlerDocumentOutsideClick(e, searchBoxMobile, setIsActive, false);
    };

    useEffect(() => {
        document.addEventListener("click", handlerOutsideSearchBoxClick);
        return () => {
            document.removeEventListener("click", handlerOutsideSearchBoxClick);
        }
    }, []);

    return (
        <div className={styles.root} ref={searchBoxMobile}>
            <IconButton onClick={toggleIsActive}
                        className={classNames(styles.searchIcon, {[styles.active]: isActive})}>
                <SearchIcon/>
            </IconButton>
            {isActive && <SearchBox/>}
        </div>
    );
};

export default SearchBoxMobile;
