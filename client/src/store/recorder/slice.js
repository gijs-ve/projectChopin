import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    outputTable: [],
    recording: false,
    intervalTime: 0,
};

export const recorderSlice = createSlice({
    name: 'recorder',
    initialState,
    reducers: {
        startRecording: (state) => {
            state.recording = true;
        },
        stopRecording: (state) => {
            state.recording = false;
        },
        addRecord: (state, action) => {
            const { soundName } = action.payload;
            console.log(soundName);
            state.outputTable.push(soundName);
            state.outputTable.push(state.intervalTime);
            state.intervalTime = 0;
        },
        raiseInterval: (state) => {
            state.intervalTime = state.intervalTime + 10;
        },
    },
});

export const { addRecord, raiseInterval, startRecording, stopRecording } =
    recorderSlice.actions;

export default recorderSlice.reducer;
