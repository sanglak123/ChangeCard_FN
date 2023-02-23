import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "client",
    initialState: {
        User: [],
        Store: [],
        DataUser: [],
        Products: [],
        BankOfUsers: [],
        Payments: [],      
    },
    reducers: {       
        //RefreshToken
        RefreshTokenSuccess: (state, actions) => {
            state.User.accessToken = actions.payload
        },
        //User
        LoginSuccess: (state, actions) => {
            state.User = actions.payload
        },
        LogoutUserSuccess: (state) => {
            state.User = [];
            state.Store = [];
            state.DataUser = []
        },
        EditProfileSuccess: (state, actions) => {
            state.User.User = actions.payload
        },
        //Store
        ChooseCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(el => el.telco === actions.payload.telco && el.value === actions.payload.value);
            if (index >= 0) {
                return;
            } else {
                state.Store = [...state.Store, actions.payload]
            }
        },
        AddCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(item => item.telco === actions.payload.telco && item.value === actions.payload.value);
            if (index >= 0) {
                state.Store[index].count += 1;
            }
        },
        SubtractionCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(el => el.telco === actions.payload.telco && el.value === actions.payload.value);
            if (index >= 0) {
                if (state.Store[index].count > 1) {
                    state.Store[index].count -= 1;
                } else {
                    state.Store.splice(index, 1);
                }
            }
        },
        DeleteCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(item => item.telco === actions.payload.telco && item.value === actions.payload.value);
            if (index >= 0) {
                state.Store.splice(index, 1); //Xóa 1 item có thứ tự từ index trở đi
            }
        },
        ClearAllStoreSuccess: (state) => {
            state.Store = [];
        },
        BuyCardSuccess: (state, actions) => {
            state.Store = [];
        },
        //DataUser
        LoadingDataUserSuccess: (state, actions) => {
            state.DataUser = actions.payload;
            state.Products = actions.payload.Products;
            state.BankOfUsers = actions.payload.BankOfUsers;
            state.Payments = actions.payload.Payments;
        },
        //BankOfUser
        AddBankOfUserSuccess: (state, actions) => {
            state.BankOfUsers.push(actions.payload)
        },
        ChangeCardSuccess: (state, actions) => {
            state.User.User.surplus = Number(state.User.User.surplus) + Number(actions.payload.receiveValue);
            const index = state.Products.findIndex(item => item.code === actions.payload.code && item.serial === actions.payload.serial)
            if (index >= 0) {
                state.Products[index] = actions.payload;
            }
        }

    }
});
export const {   
    RefreshTokenSuccess,
    //User
    LoginSuccess,
    LogoutUserSuccess,
    EditProfileSuccess,

    //Store
    ChooseCardSuccess,
    AddCardSuccess,
    SubtractionCardSuccess,
    DeleteCardSuccess,
    ClearAllStoreSuccess,
    BuyCardSuccess,
    //BankOfUser
    AddBankOfUserSuccess,
    LoadingDataUserSuccess,
    //DataUser
    DataUserSuccess,
    //Change
    ChangeCardSuccess

} = UserSlice.actions;

export default UserSlice;