import { createSlice } from '@reduxjs/toolkit';
import { defaultPreset } from '../../config/constants';
const { id, name, drum, piano, strings } = defaultPreset;
const initialState = {
    presets: [
        {
            id,
            name,
            drum,
            piano,
            strings,
        },
    ],
    currentPreset: 0,
    instrument: 'drum',
};

export const hotkeysSlice = createSlice({
    name: 'hotkeys',
    initialState,
    reducers: {
        changeHotkey: (state, action) => {},
        setInstrument: (state, action) => {
            console.log(action.payload);
            state.instrument = action.payload;
        },
        setPreset: (state, action) => {
            state.currentPreset = action.payload;
        },
    },
});

export const { changeHotkey, setInstrument, setPreset } = hotkeysSlice.actions;

export default hotkeysSlice.reducer;
