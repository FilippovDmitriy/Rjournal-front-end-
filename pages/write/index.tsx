import React from 'react';
import {GetServerSideProps, NextPage} from "next";
import MainLayout from "../../layouts/MainLayout";
import WriteForm from "../../components/WriteForm";
import {wrapper} from "../../redux/store";

const Write: NextPage = () => {
    return (
        <MainLayout fullWidth hideComments={true} hideMenu={true}>
            <WriteForm/>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
    const userAuth = store.getState().user.data;
    if (!userAuth) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }
    return {
        props: {}
    }
});

export default Write;
