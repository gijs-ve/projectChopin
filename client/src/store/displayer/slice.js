import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    playedSounds: [],
};

export const displayerSlice = createSlice({
    name: 'displayer',
    initialState,
    reducers: {
        addSound: (state, action) => {
            const { output, origin, height } = action.payload;
            const newSound = { output, origin, xPosition: 250, height };
            state.playedSounds.push(newSound);
        },
        xPosHandler: (state) => {
            const filteredPositions = state.playedSounds.filter((i) => {
                if (i.xPosition < 1) return false;
                return true;
            });
            const newPositions = filteredPositions.map((i) => {
                return { ...i, xPosition: i.xPosition - 0.5 };
            });
            state.playedSounds = newPositions;
        },
        clearDisplayer: (state) => {
            state.playedSounds = [];
        },
    },
});

export const { addSound, xPosHandler, clearDisplayer } = displayerSlice.actions;

export default displayerSlice.reducer;
