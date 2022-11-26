import { createSlice } from '@reduxjs/toolkit';
import { getDefaultRecording } from '../../components/recorder/recorderFunctions';

const initialState = {
    outputTable: [],
    name: '',
    recordings: [],
    activeRecord: 0,
    recording: false,
    listening: false,
    timer: 0,
    listenTimer: 0,
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
        setRecordings: (state, action) => {
            const defaultRecording = getDefaultRecording();
            state.recordings = [...action.payload, defaultRecording];
        },
        toggleListening: (state) => {
            if (!state.listening) state.listenTimer = 0;
            state.listening = !state.listening;
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
        raiseListenTimer: (state) => {
            state.listenTimer = state.listenTimer + 10;
        },
        setActiveRecord: (state, action) => {
            state.activeRecord = action.payload;
        },
        clearListening: (state, action) => {
            state.listening = false;
        },
    },
});

export const {
    confirmRecordName,
    addRecord,
    raiseInterval,
    raiseListenTimer,
    startRecording,
    stopRecording,
    pauseRecording,
    setRecordings,
    setActiveRecord,
    toggleListening,
    clearListening,
} = recorderSlice.actions;

export default recorderSlice.reducer;
