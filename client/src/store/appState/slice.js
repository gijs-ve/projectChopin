// src/store/balance/slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    amount: 0,
};

export const appSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {},
});

// Action creators are generated for each case reducer function
// as we add cases to our reducer we will also export the corresponding actions
export const {} = appSlice.actions;

export default appSlice.reducer;
