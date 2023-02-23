import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
    name: "data",
    initialState: {
        Prices: [],
        TypeCards: [],
        Cards: [],
        Values: [],
        Banks: [],
        News: [],
        ReceiveBanks: []
    },
    reducers: {
        LoadingDataSuccess: (state, actions) => {
            state.Prices = actions.payload.Prices
            state.TypeCards = actions.payload.TypeCards;
            state.Cards = actions.payload.Cards;
            state.Values = actions.payload.Values;
            state.Banks = actions.payload.Banks;
            state.News = actions.payload.Products;
            state.ReceiveBanks = actions.payload.ReceiveBanks;
        },
        //Prices
        UpdatePriceSuccess: (state, actions) => {
            state.Prices = actions.payload;
        },
        ChangeTypeCardSuccess: (state, actions) => {
            const index = state.Cards.findIndex(item => item.id === actions.payload.id);
            state.Cards[index] = actions.payload
        }


    }
});
export const {
    LoadingDataSuccess,
    //Prices
    UpdatePriceSuccess,
    ChangeTypeCardSuccess

} = DataSlice.actions;

export default DataSlice;