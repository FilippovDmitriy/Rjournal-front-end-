import React, {useState} from 'react';
import styles from './Auth.module.scss';
import {FormProvider, useForm} from "react-hook-form";
import {Button} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import FormField from "../../FormField";
import { yupResolver } from '@hookform/resolvers/yup';
import {LoginFormSchema, RegisterFormSchema} from "../../../utils/validations";
import {Api} from "../../../utils/api";
import {LoginDto, RegisterDto} from "../../../utils/api/types";
import {useAppDispatch} from "../../../redux/hooks";
import {setUserData} from '../../../redux/slices/user';
import {setValueCookie} from "../../../utils/functions/setCookie";
import {UserType} from "../../../utils/types/User";

type Props = {
    authType: 'login' | 'register'
};

const MailForm:React.FC<Props> = ({authType}) => {
    const dispatch = useAppDispatch();
    const [errorForm, setErrorForm] = useState('');
    const formSchema = (authType === 'login') ? LoginFormSchema : RegisterFormSchema;

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema)
    });

    const doAuth = (responseData: UserType) => {
        setValueCookie('authToken', responseData.token);
        dispatch(setUserData(responseData));
    };

    const register = async (dto: RegisterDto) => {
        await Api().users.register(dto).then((responseData: UserType) => {
            doAuth(responseData);
        }, error => setErrorForm(error.response.data.message));
    };
    const login = async (dto: LoginDto) => {
        await Api().users.login(dto).then((responseData: UserType) => {
            doAuth(responseData);
        }, error => setErrorForm(error.response.data.message));
    };

    const onSubmit = async (dto: any) => {
        if (authType === 'login') {
            await login(dto);
        } else if (authType === 'register') {
            await register(dto);
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {authType === 'register' && <FormField name={'fullName'} placeholder={'Имя и фамилия'}/>}
                <FormField name={'email'} placeholder={'Почта'}/>
                <FormField name={'password'} placeholder={'Пароль'}/>
                <div className={styles.error}>
                    {errorForm && <Alert severity="error">{errorForm}</Alert>}
                </div>
                <Button disabled={!form.formState.isValid || form.formState.isSubmitting}
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'} fullWidth>
                    {authType === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </Button>
            </form>
        </FormProvider>
    );
};

export default MailForm;