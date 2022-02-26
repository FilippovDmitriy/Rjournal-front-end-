import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CommentResponseType} from "../../utils/types/Comment";
import {Api} from "../../utils/api";
import {AppState} from "../store";

const initialState = {
    comments: [] as CommentResponseType[]
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload.comments
        }
    }
});

export const commentsActions = {
    setComments: commentsSlice.actions.setComments
};

export const commentsThunks = {
    fetchComments: createAsyncThunk(
        'comments/fetchComments', async (payload, {dispatch}) => {
            let commentsResponse = await Api().comments.getAll();
            dispatch(commentsActions.setComments({comments: commentsResponse}));
        }
    ),
};

export const commentsSelectors = {
    selectComments: (state: AppState) => state.comments.comments,
};

export const commentsReducer = commentsSlice.reducer;