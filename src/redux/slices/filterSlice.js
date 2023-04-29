import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryID: 0,
    sort: {
        name: "популярности",
        sortProperty: "rating",
    },
};


const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        
        setCategoryID(state, action) {
            state.categoryID = action.payload;
        },
        
        setSort(state, action) {
            state.sort = action.payload; 
        },

    },
});

export const { setCategoryID, setSort } = filterSlice.actions // здесь action === reducers

export default filterSlice.reducer;