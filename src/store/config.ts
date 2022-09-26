import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface configState {
    userDropDownMenu: boolean
}

const initialState: configState = {
    userDropDownMenu: false
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setUserDropDownMenu: (state, action: PayloadAction<boolean>) => {
            state.userDropDownMenu = action.payload
        }
    }
})

export const { setUserDropDownMenu } = configSlice.actions
export default configSlice.reducer