import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "../store";
import {HYDRATE} from "next-redux-wrapper";
import {UserType} from "../../utils/types/User";

const initialState = {
    data: null as UserType | null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserType | null>) => {
            state.data = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.data = action.payload.user.data
        },
    },
})

export const {setUserData} = userSlice.actions;
export const selectUserData = (state: AppState) => state.user.data;
export const selectUserAuthId = (state: AppState) => state.user.data?.id;
export const userReducer = userSlice.reducer;