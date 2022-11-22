import { createSlice } from '@reduxjs/toolkit';
import { hat, kick, hat4, snare } from '../../components/sound/sounds';

const drumState = [
    { key: 'Q', output: kick, name: 'Default kick' },
    { key: 'W', output: hat4, name: 'Default hat' },
    { key: 'E', output: hat, name: 'Gentle hat' },
    { key: 'R', output: snare, name: 'Default snare' },
];

const pianoState = [
    { key: 'Q', output: kick, name: 'Default kick' },
    { key: 'W', output: hat4, name: 'Default kick' },
    { key: 'E', output: hat, name: 'Default kick' },
];

const stringState = [
    { key: 'Q', output: kick, name: 'Default kick' },
    { key: 'W', output: hat4, name: 'Default kick' },
    { key: 'E', output: hat, name: 'Default kick' },
];

const initialState = {
    presets: [
        {
            name: 'default',
            drum: drumState,
            piano: pianoState,
            strings: stringState,
        },
    ],
    name: 'default',
    drum: drumState,
    piano: pianoState,
    strings: stringState,
};

export const hotkeysSlice = createSlice({
    name: 'hotkeys',
    initialState,
    reducers: {
        changeHotkey: (state, action) => {},
    },
});

export const { changeHotkey } = hotkeysSlice.actions;

export default hotkeysSlice.reducer;
