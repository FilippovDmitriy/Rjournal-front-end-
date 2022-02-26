import {AxiosInstance} from 'axios';
import {LoginDto, RegisterDto} from "./types";
import {UserRatingType, UserType} from "../types/User";
import {uri} from "../constants/apiUri";

export const UserApi = (instance: AxiosInstance) => ({
    async register(dto: RegisterDto) {
        const {data} = await instance.post<UserType>(`${uri.auth}/register`, dto);
        return data;
    },
    async login(dto: LoginDto) {
        const {data} = await instance.post<UserType>(`${uri.auth}/login`, dto);
        return data;
    },
    async getAll() {
        const {data} = await instance.get<UserRatingType>(uri.users);
        return data;
    },
    async getById(id: number) {
        await instance.get<UserType>(`${uri.users}/${id}`).then((data) => {
            return data
        });
    },
    async getMe() {
        const {data} = await instance.get<UserType>(`${uri.users}/me`).catch(() => ({data: null}));
        return data;
    }
});