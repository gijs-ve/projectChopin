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
        pauseRecording: (state) => {
            state.recording = true;
        },
        addRecord: (state, action) => {
            const { soundName } = action.payload;
            state.outputTable.push({
                time: state.intervalTime,
                output: soundName,
            });
            state.intervalTime = 0;
        },
        raiseInterval: (state) => {
            state.intervalTime = state.intervalTime + 10;
        },
    },
});

export const {
    addRecord,
    raiseInterval,
    startRecording,
    stopRecording,
    pauseRecording,
} = recorderSlice.actions;

export default recorderSlice.reducer;
