import React from 'react';
import style from "./Rating.module.scss";
import MainLayout from "../../layouts/MainLayout";
import {
    Avatar,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs,
    Typography
} from "@material-ui/core";
import Link from "next/link";
import {GetServerSideProps} from "next";
import {Api} from "../../utils/api";
import {UserRatingType} from "../../utils/types/User";

type Props = {
    users: UserRatingType[]
}

const Rating: React.FC<Props> = ({users}) => {
    return (
        <MainLayout>
            <Paper className={style.header} elevation={0}>
                <Typography variant="h3">Рейтинг сообществ и блогов</Typography>
                <Typography>Десять лучших авторов и комментаторов, а также администраторы первых десяти сообществ из
                    рейтинга по итогам месяца бесплатно получают <Link href={''}><a
                        className="textLink">Plus-аккаунт</a></Link> на месяц.</Typography>
            </Paper>
            <Paper className={style.main} elevation={0}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell classes={{root: style.tableCellMain}}>Пользователи</TableCell>
                            <TableCell align="right">Рейтинг</TableCell>
                            <TableCell align="right"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, key) => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row">
                                    <div className={style.tableSubsite}>
                                        <span>{key+1}</span>
                                        <Avatar className={style.ava}>{user.fullName[0]}</Avatar>
                                        <p>{user.fullName}</p>
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <span className={style.tableRating}>{user.commentsCount}</span>
                                </TableCell>
                                <TableCell align="right"/>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const users = await Api().users.getAll();
    return {
        props: {
            users
        }
    }
};

export default Rating;
