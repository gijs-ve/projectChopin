import { createSlice } from '@reduxjs/toolkit';
import { defaultPreset } from '../../components/sound/sounds';
import { convertHotkeysToString } from '../../components/settings/settingsFunctions';
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
        //changes currentPresent
        setPreset: (state, action) => {
            const newPreset = state.activePresets.find((i) => {
                if (i.key === action.payload) return true;
            });
            state.currentPreset = newPreset.presetId;
        },
        setPresetById: (state, action) => {
            state.currentPreset = action.payload;
        },
        //changes the list of presets
        setPresets: (state, action) => {
            const presetArray = action.payload;
            const newPresetArray = [
                {
                    id,
                    name,
                    drum,
                    piano,
                    strings,
                },
            ];
            if (!presetArray || presetArray.length === 0) {
                state.presets = newPresetArray;
                return;
            }
            const createNewHotkeys = (array, stringArray) => {
                return array.map((i, index) => {
                    return { ...i, key: stringArray[index] };
                });
            };
            const getStringFromType = (array, type) => {
                const typeEntry = array.find((i) => {
                    if (i.type === type) return true;
                });
                return typeEntry.keysString.split('');
            };
            presetArray.map((i) => {
                const pushedPreset = {
                    id: i.id,
                    name: i.name,
                    drum: createNewHotkeys(
                        drum,
                        getStringFromType(i.hotkeys, 'drum'),
                    ),
                    piano: createNewHotkeys(
                        piano,
                        getStringFromType(i.hotkeys, 'piano'),
                    ),
                };
                newPresetArray.push(pushedPreset);
            });
            console.log(convertHotkeysToString(piano));
            console.log(newPresetArray);
            state.presets = newPresetArray;
        },
        createNew: (state, action) => {},
        changePreset: (state, action) => {},
    },
});

export const {
    changeHotkey,
    setInstrument,
    setPreset,
    setPresets,
    setPresetById,
    changePreset,
} = hotkeysSlice.actions;

export default hotkeysSlice.reducer;
