import { configureStore } from '@reduxjs/toolkit';
import account from './account';
import config from './config';
import user from './user';

export const store = configureStore({
    reducer: {
        account: account,
        user: user,
        config: config,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch