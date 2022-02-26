import React from 'react';
import MainLayout from "../layouts/MainLayout";
import {Typography} from "@material-ui/core";

const Custom404 = () => {
    return (
        <MainLayout>
            <div>
                <Typography style={{ marginTop: '10px' }} variant={'h2'}>Ошибка 404</Typography>
                <Typography style={{ marginTop: '10px' }}>К сожалению, запрашиваемая страница не найдена, но есть другие, тоже хорошие</Typography>
            </div>
        </MainLayout>
    );
};

export default Custom404;
