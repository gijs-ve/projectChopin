import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    outputTable: [],
    recording: false,
    timer: 0,
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
            state.recording = false;
        },
        addRecord: (state, action) => {
            const { soundName } = action.payload;
            state.outputTable.push({
                time: state.timer,
                output: soundName,
            });
        },
        raiseInterval: (state) => {
            state.timer = state.timer + 10;
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
