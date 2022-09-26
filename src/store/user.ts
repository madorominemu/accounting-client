import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {useState} from 'react';

interface userState {
    isLogin: boolean
    userId: number
    username: string
}

const initialState: userState = {
    isLogin: false,
    userId: 0,
    username: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState, // 状态管理state
    reducers: { // 操作state
        setIsLogin: (state) => {
            state.isLogin = !state.isLogin
        },
        setUserId: (state, action: PayloadAction<number>) => {
            state.userId = action.payload
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        }
    }
})

export const { setIsLogin, setUserId, setUsername } = userSlice.actions

export default userSlice.reducer