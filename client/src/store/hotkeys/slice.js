import { createSlice } from '@reduxjs/toolkit';
import {
    hat,
    kick,
    hat4,
    snare,
    aK3,
    aK4,
    aK5,
    a3,
    a4,
    a5,
    bK3,
    bK4,
    bK5,
    b3,
    b4,
    b5,
    cK3,
    cK4,
    cK5,
    c3,
    c4,
    c5,
    c6,
    dK3,
    dK4,
    dK5,
    d3,
    d4,
    d5,
    eK3,
    eK4,
    eK5,
    e3,
    e4,
    e5,
    fK3,
    fK4,
    fK5,
    f3,
    f4,
    f5,
    gK3,
    gK4,
    gK5,
    g3,
    g4,
    g5,
} from '../../components/sound/sounds';

const drumState = [
    { key: 'Q', output: kick, name: 'Default kick' },
    { key: 'W', output: hat4, name: 'Default hat' },
    { key: 'E', output: hat, name: 'Gentle hat' },
    { key: 'R', output: snare, name: 'Default snare' },
];

const pianoState = [
    { key: 'A', output: c4, name: 'C4' },
    { key: 'S', output: d4, name: 'D4' },
    { key: 'D', output: e4, name: 'E4' },
    { key: 'F', output: f4, name: 'F4' },
    { key: 'G', output: g4, name: 'G4' },
    { key: 'H', output: a5, name: 'A5' },
    { key: 'J', output: b5, name: 'B5' },
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
