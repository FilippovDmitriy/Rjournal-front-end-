import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import styles from './SearchBox.module.scss';
import SearchIcon from "@material-ui/icons/Search";
import {List, ListItem, Paper} from "@material-ui/core";
import Link from "next/link";
import {Api} from "../../utils/api";
import {handlerDocumentOutsideClick} from "../../utils/functions/handleOutsideClick";
import {PostExtendedType} from "../../utils/types/Post";

const SearchBox: React.FC = () => {
    const [isVisibleSearchPopup, setIsVisibleSearchPopup] = useState(false);
    const [searchedPosts, setSearchedPosts] = useState<PostExtendedType[]>([]);

    const searchBoxRef = useRef<HTMLDivElement>(null);

    const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== '') {
            const responsePosts = await Api().posts.searchPosts({title: e.target.value});
            setSearchedPosts(responsePosts.items);
        } else {
            setSearchedPosts([])
        }
    };
    const handlerOutsidePopupClick = (e: any) => {
        handlerDocumentOutsideClick(e, searchBoxRef, setIsVisibleSearchPopup, false);
    };

    useEffect(() => {
        if (searchedPosts.length !== 0) {
            setIsVisibleSearchPopup(true);
        }
        document.addEventListener("click", handlerOutsidePopupClick);
        return () => {
            document.removeEventListener("click", handlerOutsidePopupClick);
        }
    }, [searchedPosts])

    return (
        <div className={styles.searchBox} ref={searchBoxRef}>
            <SearchIcon/>
            <input placeholder={'Поиск'}
                   onChange={handleChangeInput}
                   type="text"
                   onFocus={() => setIsVisibleSearchPopup(true)}/>
            {(searchedPosts.length > 0 && isVisibleSearchPopup) &&
            <Paper className={styles.searchPopup}>
                {searchedPosts.slice(0, 5).map((post, key) =>
                    <List key={post.id}>
                        <Link href={`/news/${post.id}`}>
                            <a>
                                <ListItem className={styles.searchItem} button>{post.title}</ListItem>
                            </a>
                        </Link>
                    </List>
                    )
                }
            </Paper>}
        </div>
    );
};

export default SearchBox;
