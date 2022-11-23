import { createSlice } from '@reduxjs/toolkit';
import { defaultPreset } from '../../components/sound/sounds';
const { id, name, drum, piano, strings } = defaultPreset;
const activePresets = [{ key: '0', presetId: 0 }];
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
    activePresets,
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
            const newPreset = state.activePresets.find((i) => {
                if (i.key === action.payload) return true;
            });
            state.currentPreset = newPreset.presetId;
        },
        addNewPreset: (state, action) => {},
    },
});

export const { changeHotkey, setInstrument, setPreset, addNewPreset } =
    hotkeysSlice.actions;

export default hotkeysSlice.reducer;
