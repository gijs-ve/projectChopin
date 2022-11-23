import { createSlice } from '@reduxjs/toolkit';

const testSound = { output: 'G#5', origin: 'self', xPosition: 800 };
const testSound2 = { output: 'G#5', origin: 'self', xPosition: 600 };

const initialState = {
    playedSounds: [testSound, testSound2],
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
