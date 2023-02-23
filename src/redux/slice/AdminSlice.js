import { createSlice } from "@reduxjs/toolkit";

const AdminDataSlice = createSlice({
    name: "admin",
    initialState: {
        Data: [],
        Users: [],
        ChangeCards: [],
        BuyCards: [],
        LoginAdmin: false

    },
    reducers: {
        // LoginAdmin
        LoginAdminSuccess: (state, actions) => {
            state.LoginAdmin = actions.payload
        },
        //Admin logout
        LogoutAdminSuccess: (state) => {
            state.LoginAdmin = false;
            state.Data = [];
            state.Users = [];
            state.BuyCards = [];
            state.ChangeCards = [];
        },
        //Data Admin
        LoadingDataAdminSuccess: (state, actions) => {
            state.Users = actions.payload.Users;
            state.ChangeCards = actions.payload.ChangeCards;
            state.BuyCards = actions.payload.BuyCards
        }
    }
});
export const {
    LoadingDataAdminSuccess,
    LoginAdminSuccess,
    LogoutAdminSuccess

} = AdminDataSlice.actions;

export default AdminDataSlice;