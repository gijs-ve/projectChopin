import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    outputTable: [],
    name: '',
    recording: false,
    listening: false,
    timer: 0,
};

export const recorderSlice = createSlice({
    name: 'recorder',
    initialState,
    reducers: {
        confirmRecordName: (state, action) => {
            console.log(action.payload);
            state.name = action.payload;
        },
        startRecording: (state) => {
            state.recording = true;
        },
        stopRecording: (state) => {
            state.recording = false;
            state.timer = 0;
            state.outputTable = [];
        },
        pauseRecording: (state) => {
            state.recording = false;
        },
        addRecord: (state, action) => {
            const { soundName } = action.payload;
            if (state.outputTable.length === 0) {
                state.outputTable.push({
                    time: 500,
                    output: 'GEN',
                });
                state.timer = 500;
            }
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
    confirmRecordName,
    addRecord,
    raiseInterval,
    startRecording,
    stopRecording,
    pauseRecording,
} = recorderSlice.actions;

export default recorderSlice.reducer;
