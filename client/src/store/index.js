import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {isloggedIn: false},
    reducers: {
        login(state){
           state.isloggedIn = true
        },
        logout(state){
            localStorage.removeItem('userId')
           state.isloggedIn = false
        },
    },
});

export const authActions = authSlice.actions

export const store = configureStore({
    reducer: authSlice.reducer
})
