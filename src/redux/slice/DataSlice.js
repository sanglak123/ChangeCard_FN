import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
    name: "data",
    initialState: {
        Data: []
    },
    reducers: {
        LoadingDataSuccess: (state, actions) => {
            state.Data = actions.payload
        },
      
    }
});
export const {
    LoadingDataSuccess, 
} = DataSlice.actions;

export default DataSlice;