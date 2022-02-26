import React, {FC} from 'react';
import styles from "./DrawerLeftSide.module.scss";
import {Drawer, IconButton} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "../../Logo";
import LeftSide from "../index";

type Props = {
    isOpenDrawer: boolean,
    onCloseDrawer: () => void,
    toggleIsVisibleLeftSide: () => void,
};

const DrawerLeftSide: FC<Props> = ({isOpenDrawer, onCloseDrawer, toggleIsVisibleLeftSide}) => {
    return (
        <Drawer anchor={'left'}
                open={isOpenDrawer}
                onClose={onCloseDrawer}>
            <div className={styles.top}>
                <IconButton onClick={toggleIsVisibleLeftSide}>
                    <MenuIcon/>
                </IconButton>
                <Logo/>
            </div>
            <LeftSide/>
        </Drawer>
    );
};

export default DrawerLeftSide;
