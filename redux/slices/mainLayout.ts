import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "../store";

const initialState = {
    isVisibleLeftSide: true as boolean
};

export const mainLayoutSlice = createSlice({
    name: 'mainLayout',
    initialState,
    reducers: {
        setIsVisibleLeftSide: (state, action: PayloadAction<boolean>) => {
            state.isVisibleLeftSide = action.payload;
        },
    },
})

export const {setIsVisibleLeftSide} = mainLayoutSlice.actions;
export const selectIsVisibleLeftSide = (state: AppState) => state.mainLayout.isVisibleLeftSide;
export const mainLayoutReducer = mainLayoutSlice.reducer;