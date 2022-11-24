import { createSlice } from '@reduxjs/toolkit';
import { defaultPreset } from '../../components/sound/sounds';
import { convertHotkeysToString } from '../../components/settings/settingsFunctions';
import { allowedKeybindings } from '../../components/settings';
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
        //changes currentPresent with just a number, used in settings
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
            state.presets = newPresetArray;
        },
        editHotkey: (state, action) => {
            const { sectionName, currentPresetId, output, key } =
                action.payload;
            const upperKey = key.toUpperCase();
            const allowedKey = allowedKeybindings.includes(upperKey);
            const mapInstruments = (array) => {
                return array.map((i) => {
                    console.log(i.key);
                    if (i.key === upperKey) return { ...i, key: '-' };
                    if (i.output !== output) return i;
                    if (!allowedKey) return { ...i, key: '-' };
                    return { ...i, key: upperKey };
                });
            };
            const newPresets = state.presets.map((i) => {
                if (i.id !== currentPresetId) return i;
                if (sectionName === 'Drums') {
                    const drum = mapInstruments(i.drum);
                    return { ...i, drum };
                }
                if (sectionName === 'Piano') {
                    const piano = mapInstruments(i.piano);
                    return { ...i, piano };
                }
            });

            state.presets = newPresets;
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
    editHotkey,
    changePreset,
} = hotkeysSlice.actions;

export default hotkeysSlice.reducer;
