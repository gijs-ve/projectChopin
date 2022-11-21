import { createSlice } from '@reduxjs/toolkit';
import { hat, kick } from '../../components/sound/sounds';

const drumState = [
    { key: 'Q', output: hat },
    { key: 'W', output: kick },
];

const initialState = {
    preset: 'default',
    drum: drumState,
    piano: null,
    strings: null,
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
