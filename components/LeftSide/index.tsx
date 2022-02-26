import React, {useState} from 'react';
import style from "./LeftSide.module.scss";
import FireIcon from '@material-ui/icons/Whatshot';
import TrendingIcon from '@material-ui/icons/TrendingUp';
import {Button} from "@material-ui/core";
import Link from "next/link";
import {useRouter} from "next/router";
import classNames from "classnames";

const LeftSide: React.FC = () => {
    const menuData = [
        {path: '/', text: 'Популярное', icon: <FireIcon/>},
        {path: '/rating', text: 'Рейтинг TJ', icon: <TrendingIcon/>},
    ];
    const router = useRouter();
    const {pathname} = router;

    return (
        <div className={style.menu}>
            <ul>
                {menuData.map((obj, index) =>
                    <li key={index} className={classNames({[style.activeLink]: obj.path === pathname})}>
                        <Link href={obj.path}>
                            <a>
                                <Button variant={obj.path === pathname ? 'contained' : 'text'}>
                                    {obj.icon}
                                    {obj.text}
                                </Button>
                            </a>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default LeftSide;
