import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {useState} from 'react';

interface accountState {
    pickMonth: string
    pickUseType: string
}

const initialState: accountState = {
    pickMonth: '',
    pickUseType: ''
}

export const accountSlice = createSlice({
    name: 'account',
    initialState, // 状态管理state
    reducers: { // 操作state
        setPickMonth: (state, action: PayloadAction<string>) => {
            state.pickMonth = action.payload
        },
        setPickUseType: (state, action: PayloadAction<string>) => {
            state.pickUseType = action.payload
        },
    }
})

export const { setPickMonth, setPickUseType} = accountSlice.actions

export default accountSlice.reducer