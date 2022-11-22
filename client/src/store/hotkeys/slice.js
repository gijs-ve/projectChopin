import { createSlice } from '@reduxjs/toolkit';
import { hat, kick, hat4 } from '../../components/sound/sounds';

const drumState = [
    { key: 'Q', output: kick },
    { key: 'W', output: hat4 },
    { key: 'E', output: hat },
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
