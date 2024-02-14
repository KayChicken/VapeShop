import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { useSelector } from 'react-redux';
import { RootState } from '../store';


export const fetchUserData : any = createAsyncThunk('auth/fetchUserData' , async (params) => {
    const {data} = await axios.post('/authorization/login', params);
    return data
})


export const fetchAuthMe : any = createAsyncThunk('auth/fetchAuthMe' , async () => {
    const {data} = await axios.get('/authorization/me');
    return data
})

interface IAuthState {
    data: {
        id: number,
        login: string,
        email: string,
        vk: string | null,
        tg: string | null,
        token: string
    } | null,
    status: string
}


interface IUser {
    id: number,
        login: string,
        email: string,
        vk: string | null,
        tg: string | null,
        token: string
}



const initialState: IAuthState = {
    data : null,
    status : 'loading'
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        exitAccount: (state) => {
            state.data = null
            state.status = 'loading'
        },



    },
    extraReducers: {
       [fetchUserData.pending] : (state) => {
        state.status = 'loading'
        state.data = null
       },
       [fetchUserData.fulfilled] : (state,action: PayloadAction<IUser>) => {
        state.status = 'loaded'
        state.data = action.payload
       },
       [fetchUserData.rejected] : (state) => {
        state.status = 'error'
        state.data = null
       },

       [fetchAuthMe.pending] : (state) => {
        state.status = 'loading'
        state.data = null
       },
       [fetchAuthMe.fulfilled] : (state,action: PayloadAction<IUser>) => {
        state.status = 'loaded'
        state.data = action.payload
       },
       [fetchAuthMe.rejected] : (state) => {
        state.status = 'error'
        state.data = null
       },
    },
})

// Action creators are generated for each case reducer function
export const {exitAccount} = authSlice.actions
export const selectIsAuth = (state : RootState) => Boolean(state.auth.data)
export default authSlice.reducer