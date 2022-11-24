import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    outputTable: [],
    recording: false,
};

export const recorderSlice = createSlice({
    name: 'recorder',
    initialState,
    reducers: {
        addRecord: (state, action) => {
            const { soundName, interval } = action.payload;
            state.outputTable.push(soundName);
            state.outputTable.push(interval);
        },
    },
});

export const { addRecord } = recorderSlice.actions;

export default recorderSlice.reducer;
