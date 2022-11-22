import { createSlice } from '@reduxjs/toolkit';
import { hat, kick, hat4, snare } from '../../components/sound/sounds';

const drumState = [
    { key: 'Q', output: kick },
    { key: 'W', output: hat4 },
    { key: 'E', output: hat },
    { key: 'R', output: snare },
];

const pianoState = [
    { key: 'Q', output: kick },
    { key: 'W', output: hat4 },
    { key: 'E', output: hat },
];

const stringState = [
    { key: 'Q', output: kick },
    { key: 'W', output: hat4 },
    { key: 'E', output: hat },
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
