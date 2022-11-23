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
        addSound: (state, action) => {
            const { output, origin } = action.payload;
            const newSound = { output, origin, xPosition: 800 };
            state.playedSounds.push(newSound);
        },
        xPosHandler: (state) => {
            const filteredPositions = state.playedSounds.filter((i) => {
                if (i.xPosition < 1) return false;
                return true;
            });
            const newPositions = filteredPositions.map((i) => {
                return { ...i, xPosition: i.xPosition - 3 };
            });
            state.playedSounds = newPositions;
        },
    },
});

export const { addSound, xPosHandler } = displayerSlice.actions;

export default displayerSlice.reducer;
