//Redux Toolkit
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AdminDataSlice from "./slice/AdminSlice";
import UserSlice from "./slice/UserSlice";
import DataSlice from "./slice/DataSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    UserSlice: UserSlice.reducer,
    DataSlice: DataSlice.reducer,
    AdminDataSlice: AdminDataSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const ListTypeCard = [
    {
        telco: "VIETTEL",
        name: "Thẻ Viettel",
        img: "/img/card/the_viettel.png",
        type: "phone",
        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "300.000", "500.000", "1.000.000",]
    },
    {
        telco: "VINAPHONE",
        name: "Thẻ Vinaphone",
        img: "/img/card/the_vinaphone.jpeg",
        type: "phone",
        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "300.000", "500.000"]
    },
    {
        telco: "MOBIFONE",
        name: "Thẻ Mobifone",
        img: "/img/card/the_mobifone.jpeg",
        type: "phone",
        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "300.000", "500.000"]
    },
    {
        telco: "VNMOBI",
        name: "Thẻ Vietnamobile",
        img: "/img/card/the_vietnamobile.jpeg",
        type: "phone",
        value: ["10.000", "20.000", "50.000", "100.000", "200.000", "300.000", "500.000"]
    },
    {
        telco: "GARENA",
        name: "Thẻ Garena",
        img: "/img/card/the_garena.png",
        type: "phone",
        value: ["20.000", "50.000", "100.000", "200.000", "500.000"]
    },
    {
        telco: "APPOTA",
        name: "Thẻ Appota",
        img: "/img/card/the_appota.png",
        type: "game",
        value: ["50.000", "100.000", "200.000", "300.000", "500.000", "1.000.000", "2.000.000", "3.000.000"]
    },
    {
        telco: "ZING",
        name: "Thẻ Zing",
        img: "/img/card/the_zing.png",
        type: "game",
        value: ["10.000", "20.000", "50.000", "100.000", "200.000", "500.000", "1.000.000"]
    },
    {
        telco: "VCOIN",
        name: "Thẻ Vcoin",
        img: "/img/card/the_vcoin.png",
        type: "game",
        value: ["10.000", "20.000", "50.000", "100.000", "200.000", "300.000", "500.000", "1.000.000", "2.000.000", "3.000.000", "5.000.000"]
    },
    {
        telco: "GATE",
        name: "Thẻ Gate",
        img: "/img/card/the_gate.png",
        type: "game",
        value: ["10.000", "20.000", "50.000", "100.000", "200.000", "500.000", "1.000.000", "2.000.000", "3.000.000", "5.000.000"]
    },
    {
        telco: "TEAM",
        name: "Thẻ Cà Rốt",
        img: "/img/card/the_team.jpg",
        type: "game",
        value: ["100.000", "200.000", "300.000"]
    },
    {
        telco: "FUNCARD",
        name: "Thẻ Funcard",
        img: "/img/card/the_funcard.jpg",
        type: "game",
        value: ["10.000", "20.000", "50.000", "100.000", "200.000", "500.000", "1.000.000",]
    },
    {
        telco: "VEGA",
        name: "Thẻ VEGA",
        img: "/img/card/the_vega.png",
        type: "game",
        value: ["20.000", "50.000", "100.000", "200.000", "500.000", "1.000.000", "2.000.000"]
    },
    {
        telco: "SOHACOIN",
        name: "SOHACOIN",
        img: "/img/card/the_sohacoin.png",
        type: "phone",
        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "500.000", "1.000.000", "2.000.000", "5.000.000"]
    },
    {
        telco: "ONCASH",
        name: "ONCASH",
        img: "/img/card/the_oncash.jpeg",
        type: "game",
        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "300.000", "500.000", "1.000.000",]
    },
    {
        telco: "BITVN",
        name: "BITVN",
        img: "/img/card/the_bitvn.jpg",
        type: "phone",
        value: ["20.000", "50.000", "100.000", "200.000", "500.000"]
    },
    {
        telco: "KUL",
        name: "KUL",
        img: "/img/card/the_kul.jpeg",
        type: "game",
        value: ["10.000", "20.000", "50.000", "100.000", "200.000", "500.000", "1.000.000", "2.000.000"]
    },
    {
        telco: "GOSU",
        name: "GOSU",
        img: "/img/card/the_gosu.png",
        type: "game",
        value: ["10.000", "20.000", "50.000", "100.000", "200.000", "300.000", "500.000", "1.000.000"]
    },
    {
        telco: "SCOIN",
        name: "SCOIN",
        img: "/img/card/the_scoin.jpg",
        type: "game",
        value: ["10.000", "20.000", "50.000", "100.000", "200.000", "500.000", "1.000.000", "2.000.000", "5.000.000"]
    },
];

export let persistor = persistStore(Store);