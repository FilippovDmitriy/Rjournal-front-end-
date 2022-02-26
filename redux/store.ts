import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {userReducer} from "./slices/user";
import thunk from "redux-thunk";
import {createWrapper} from "next-redux-wrapper";
import {postsReducer} from "./slices/posts";
import {mainLayoutReducer} from "./slices/mainLayout";
import {commentsReducer} from "./slices/comments";

const makeStore = () => configureStore({
    reducer: {
        user: userReducer,
        posts: postsReducer,
        mainLayout: mainLayoutReducer,
        comments: commentsReducer
    },
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
});

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export const wrapper = createWrapper<AppStore>(makeStore);