import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    outputTable: [],
    name: '',
    recordings: [],
    activeRecord: 5,
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
            if (!action.payload || action.payload.length === 0) {
                state.recordings = [];
                return;
            }
            state.recordings = action.payload;
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
            if (!state.recordings || state.recordings === 0) return;
            const activeRecord = state.recordings.find((i) => {
                return i.id === action.payload;
            });
            state.activeRecord = activeRecord;
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
    setActiveRecordId,
    toggleListening,
} = recorderSlice.actions;

export default recorderSlice.reducer;
