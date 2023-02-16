import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "client",
    initialState: {
        User: [],
        Store: []
    },
    reducers: {
        //Authen
        LoginSuccess: (state, actions) => {
            state.User = actions.payload
        },
        LogoutUserSuccess: (state) => {
            state.User = [];
            state.Store = [];
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
        //History Change card
        HistoryChangeCardSuccess: (state, actions) => {
            state.HistoryChangeCards = actions.payload
        },
        HistoryBuyCardSuccess: (state, actions) => {
            state.HistoryBuyCards = actions.payload
        }
    }
});
export const {
    //Authen
    LoginSuccess,
    LogoutUserSuccess,

    //Store
    ChooseCardSuccess,
    AddCardSuccess,
    SubtractionCardSuccess,
    DeleteCardSuccess,
    ClearAllStoreSuccess,
    BuyCardSuccess,

    //History Change Card
    HistoryChangeCardSuccess,
    HistoryBuyCardSuccess
} = UserSlice.actions;

export default UserSlice;