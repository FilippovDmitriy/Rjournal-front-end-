import {setCookie} from "nookies";

export const setValueCookie = (name: string, value: string) => {
    setCookie(null, name, value, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    })
};