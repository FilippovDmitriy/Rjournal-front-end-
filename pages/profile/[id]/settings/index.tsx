import React from 'react';
import {Button, Paper, TextField, Typography} from "@material-ui/core";
import style from "./Settings.module.scss";
import MainLayout from "../../../../layouts/MainLayout";
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import Link from "next/link";
import StarIcon from '@material-ui/icons/StarBorderOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsNoneOutlined';
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import BlockIcon from '@material-ui/icons/Block';
import {useAppSelector} from "../../../../redux/hooks";
import {selectUserData} from "../../../../redux/slices/user";

const Settings: React.FC = () => {
    const authUser = useAppSelector(selectUserData);

    return (
        <MainLayout isLargeSize>
            <div className={style.settings}>
                <Paper className={style.main} elevation={0}>
                    <Link href={'/profile/[id]'} as={`/profile/${authUser?.id}`}>
                        <a className={style.linkBack}><ArrowBackIcon/><span>{authUser?.fullName}</span></a>
                    </Link>
                    <form>
                        <div className={style.formSection}>
                            <Typography className={style.formTitle} variant="h5">Почта и пароль</Typography>
                            <TextField size={"small"} fullWidth placeholder="example@gmail.com" variant="outlined"/>
                            <Link href={"/"}>
                                <a className={style.changePassword}>Изменить пароль</a>
                            </Link>
                        </div>
                        <div className={style.formSection}>
                           <Button variant={"contained"} color={"primary"}>Сохранить</Button>
                        </div>
                    </form>
                </Paper>
                <div className={style.sidebar}>
                    <Paper className={style.tabsContainer} elevation={0}>
                        <Typography variant="h6">Настройки</Typography>
                        <ul className={style.tabs}>
                            <li className={style.tab}><SettingsIcon/><span>Основные</span></li>
                            <li className={style.tab}><StarIcon/><span>Функции</span></li>
                            <li className={style.tab}><NotificationsIcon/><span>Уведомления</span></li>
                            <li className={style.tab}><BlockIcon/><span>Черный список</span></li>
                        </ul>
                    </Paper>
                    <Link href={"/"}>
                        <a className={style.devtools}>Инструменты разработчика</a>
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
};

export default Settings;