import * as yup from 'yup';

export const LoginFormSchema = yup.object({
    email: yup.string().email('Неверный формат почты').required('Почта обязательна'),
    password: yup.string().min(6, 'Длина пароля должна быть не менее 6 символов').required('Пароль обязателен'),
});

export const RegisterFormSchema = yup.object({
    fullName: yup.string().required('Имя и фамилия обязательны')
}).concat(LoginFormSchema);