import React, {FC} from 'react';
import style from "./Profile.module.scss";
import {Avatar, Button, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import Link from "next/link";
import MainLayout from "../../layouts/MainLayout";
import ChatIcon from '@material-ui/icons/Chat';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import {GetServerSideProps} from "next";
import {Api} from "../../utils/api";
import {wrapper} from "../../redux/store";
import {UserType} from "../../utils/types/User";
import {TabContext, TabPanel} from "@material-ui/lab";
import {CommentResponseType} from "../../utils/types/Comment";
import {PostExtendedType} from "../../utils/types/Post";
import Post from "../../components/Post";

type Props = {
    user: UserType
    comments: CommentResponseType[]
    posts: PostExtendedType[]
    isAuth: boolean
}

const Profile: FC<Props> = ({user, comments, posts, isAuth,}) => {
    const [activeTab, setActiveTab] = React.useState(0);

    const profileId = user.id;

    const subscribers: any[] = [];
    const subscriptions: any[] = [];

    return (
        <MainLayout isLargeSize>
            <TabContext value={String(activeTab)}>
                <div className={style.profileMain}>
                    <Paper className={style.profileInfo} elevation={0}>
                        <div className={style.profileInfo__top}>
                            <Avatar className={style.profileInfo__avatar}>{user.fullName[0]}</Avatar>
                            {isAuth && <div className={style.profileInfo__buttons}>
                                <Link href={'/profile/[id]/settings'} as={`/profile/${profileId}/settings`}>
                                    <a>
                                        <Button variant="contained"><SettingsIcon/></Button>
                                    </a>
                                </Link>
                                <Link href={'/'}>
                                    <a>
                                        <Button variant="contained" color="primary"><ChatIcon/>Написать</Button>
                                    </a>
                                </Link>
                            </div>}
                        </div>
                        <Typography variant="h4" className={style.profileInfo__name}>
                            <Link href={'/profile/[id]'} as={`/profile/${profileId}`}>
                                <a>{user.fullName}</a>
                            </Link>
                        </Typography>
                        <Typography className={style.profileInfo__date}>На проекте
                            с {user.createdAt.slice(0, 10)}</Typography>
                        <Tabs onChange={(_, newValue) => setActiveTab(newValue)}
                              className={style.profileInfo__tabs}
                              value={activeTab}
                              indicatorColor="primary">
                            <Tab label="Статьи"/>
                            <Tab label="Комментарии"/>
                        </Tabs>
                    </Paper>
                    <TabPanel value='0' className={style.tabItem}>
                        {isAuth && <Paper className={style.newRecord} elevation={0}>
                            <div className={style.newRecord__top}>
                                <Avatar className={style.newRecord__avatar}>{user.fullName[0]}</Avatar>
                                <Link href={'/write'}>
                                    <a>
                                        <div className={style.newRecord__record}>Новая запись</div>
                                    </a>
                                </Link>
                            </div>
                            <div className={style.newRecord__list}>
                                <ul>
                                    <li>
                                        <Link href={'/write'}>
                                            <a>
                                                <svg viewBox="0 0 24 24" id="v_image">
                                                    <path d="M8 9.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" color="#0a10a1">

                                                    </path>
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                          d="M7 3a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7zM5 7a2 2 0 012-2h10a2 2 0 012 2v5.252l-1.478-1.477a2 2 0 00-3.014.214L8.5 19H7a2 2 0 01-2-2V7zm11.108 5.19L19 15.08V17a2 2 0 01-2 2h-6l5.108-6.81z">

                                                    </path>
                                                </svg>
                                                Фото и видео
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/write'}>
                                            <a>
                                                <svg viewBox="0 0 24 24" id="v_link">
                                                    <path fillRule="evenodd"
                                                          d="M12.344 4.446A5.092 5.092 0 0115.94 3a5.093 5.093 0 013.57 1.509 5.157 5.157 0 011.494 3.587 5.159 5.159 0 01-1.43 3.614l-.013.012-2.465 2.485a5.08 5.08 0 01-6.068.878 5.12 5.12 0 01-1.641-1.434 1 1 0 011.606-1.192c.267.361.608.659 1 .874a3.086 3.086 0 003.683-.535l2.459-2.478a3.159 3.159 0 00.87-2.206 3.158 3.158 0 00-.914-2.197A3.093 3.093 0 0015.923 5a3.092 3.092 0 00-2.18.874l-1.408 1.411a1 1 0 11-1.415-1.413l1.413-1.416.01-.01z"
                                                          clipRule="evenodd">

                                                    </path>
                                                    <path fillRule="evenodd"
                                                          d="M8.733 8.605a5.08 5.08 0 014.24.306 5.118 5.118 0 011.641 1.434 1 1 0 01-1.606 1.192 3.119 3.119 0 00-1-.874 3.084 3.084 0 00-3.683.535l-2.46 2.478a3.159 3.159 0 00-.869 2.207c.007.826.336 1.614.913 2.196.577.582 1.356.91 2.169.917a3.092 3.092 0 002.178-.873l1.399-1.41a1 1 0 111.42 1.409l-1.406 1.416-.012.012a5.092 5.092 0 01-3.596 1.446 5.093 5.093 0 01-3.571-1.508A5.158 5.158 0 012.996 15.9a5.158 5.158 0 011.432-3.614l.012-.012 2.465-2.485a5.106 5.106 0 011.828-1.184z"
                                                          clipRule="evenodd">

                                                    </path>
                                                </svg>
                                                Ссылка
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Paper>}
                        {posts.length === 0
                            ? isAuth
                                ? (<Paper className={style.createRecord} elevation={0}>
                                    <div className={style.createRecord__text}>Если у вас есть интересная идея для
                                        статьи, не
                                        стесняйтесь
                                        и скорее начинайте писать
                                    </div>
                                    <Link href={'/write'}>
                                        <a><Button variant="contained">Создать запись</Button></a>
                                    </Link>
                                </Paper>)
                                : (<Paper elevation={0} className={style.createRecord}>
                                    <Typography variant='h4'>Записи отсутствуют</Typography>
                                </Paper>)
                            : posts.map(post => <Post key={post.id}
                                                      title={post.title}
                                                      description={post.description}
                                                      postId={post.id}
                                                      userId={post.user.id}
                                                      postBody={post.body}/>)}
                    </TabPanel>
                    <TabPanel value='1' className={style.tabItem}>
                        <div className={style.comments}>
                            {comments.map(comment => (
                                <Paper key={comment.id} className={style.comment} elevation={0}>
                                    <Link href={`/news/${comment.post.id}`}>
                                        <a className={style.comment__title}>{comment.post.title}</a>
                                    </Link>
                                    <Link href={`/profile/${comment.user.id}`}>
                                        <a className={style.comment__top}>
                                            <Avatar className={style.comment__ava}>{comment.user.fullName[0]}</Avatar>
                                            <div className={style.comment__name}>{comment.user.fullName}</div>
                                            <div className={style.comment__created}>{comment.createdAt.slice(0, 10)}</div>
                                        </a>
                                    </Link>
                                    <div className={style.comment__text}>{comment.text}</div>
                                </Paper>
                            ))}
                        </div>
                    </TabPanel>
                    <Paper className={style.subscribers} elevation={0}>
                        <Typography variant={"h6"}>Подписчики</Typography>
                        <div className={style.subscribers__main}>
                            {subscribers.length
                                ? <span>Подписчики</span>
                                : <div className={style.subscribers__void}>У вас нет ещё подписчиков</div>}
                        </div>
                    </Paper>
                    <Paper className={style.subscriptions} elevation={0}>
                        <Typography variant={"h6"}>Подписки <span>{subscriptions.length}</span></Typography>
                        <div className={style.subscriptions_main}>
                            {subscriptions.length
                                ? <span>Подписки</span>
                                : <div className={style.subscriptions__void}>У вас нет ещё подписок</div>}
                        </div>
                    </Paper>
                </div>
            </TabContext>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
    const pathId = +(ctx.params?.id as string);
    const userAuth = store.getState().user.data;

    let comments = await Api().comments.getAll();
    comments = comments.filter(comment => comment.user.id === pathId);

    let posts = await Api().posts.getAll();
    posts = posts.filter(post => post.user.id === pathId);

    let user;
    let isAuth;

    if (userAuth?.id === pathId) {
        user = userAuth;
        isAuth = true;
    } else {
        user = await Api().users.getById(pathId) as UserType | undefined;
        if (!user) {
            return {
                notFound: true
            }
        }
        isAuth = false;
    }

    return {
        props: {
            user,
            comments,
            posts,
            isAuth
        }
    }
});

export default Profile;
