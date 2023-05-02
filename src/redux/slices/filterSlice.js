import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchValue: '',
    categoryID: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
    },
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryID(state, action) {
            state.categoryID = action.payload;
        },

        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },

        setSort(state, action) {
            state.sort = action.payload;
        },

        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },

        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            state.categoryID = Number(action.payload.categoryID);
        },
    },
});

export const selectSort = (state) => state.filterSlice.sort;
export const selectFilter = (state) => state.filterSlice;

export const { setCategoryID, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions; // здесь action === reducers

export default filterSlice.reducer;
