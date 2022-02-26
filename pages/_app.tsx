import '../styles/globals.scss';
import type {AppProps} from 'next/app';
import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import theme from "../theme";
import {wrapper} from "../redux/store";
import {Api} from "../utils/api";
import {setUserData} from "../redux/slices/user";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ctx, Component}) => {
    const userData = await Api(ctx).users.getMe();
    store.dispatch(setUserData(userData));
    return {
        pageProps: Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {},
    };
});

export default wrapper.withRedux(MyApp);
