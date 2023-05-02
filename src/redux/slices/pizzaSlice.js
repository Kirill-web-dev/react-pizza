import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
    const { correctSort, order, category, search, currentPage } = params;
    const { data } = await axios.get(
        `https://644bf1bc4bdbc0cc3a9e9d4f.mockapi.io/pizzas?page=${currentPage}&limit=8&${category}&sortBy=${correctSort}&order=${order}${search}`
    );
    return data;
});

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,

    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = 'loading';
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        });
    },
});

export const { setItems } = pizzaSlice.actions; // здесь actions === reducers

export default pizzaSlice.reducer;
