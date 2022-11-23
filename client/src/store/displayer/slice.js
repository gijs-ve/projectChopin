import { createSlice } from '@reduxjs/toolkit';

const testSound = { output: 'G#5', origin: 'self', xPosition: 1000 };

const initialState = {
    playedSounds: [testSound, testSound],
};

export const displayerSlice = createSlice({
    name: 'displayer',
    initialState,
    reducers: {
        addSound: (state, action) => {},
    },
});

export const { addSound } = displayerSlice.actions;

export default displayerSlice.reducer;
