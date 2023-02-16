import { createSlice } from "@reduxjs/toolkit";

const AdminDataSlice = createSlice({
    name: "admin",
    initialState: {
        Admin: [],
        Data: []
    },
    reducers: {
        LoginAdminSuccess: (state, actions) => {
            state.Admin = actions.payload
        },
        LogoutAdminSuccess: (state, actions) => {
            state.Admin = []
        },
        EditProfileSuccess: (state, actions) => {
            state.Admin.Admin = actions.payload;
        },
        //Data Admin
        LoadingDataAdminSuccess: (state, actions) => {
            state.Data = actions.payload
        }
    }
});
export const {
    LoginAdminSuccess,
    LogoutAdminSuccess,
    EditProfileSuccess,
    LoadingDataAdminSuccess

} = AdminDataSlice.actions;

export default AdminDataSlice;