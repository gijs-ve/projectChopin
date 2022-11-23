import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    playedSounds: null,
};

export const displayerSlice = createSlice({
    name: 'hotkeys',
    initialState,
    reducers: {
        addSound: (state, action) => {},
    },
});

export const { addSound } = displayerSlice.actions;

export default displayerSlice.reducer;
