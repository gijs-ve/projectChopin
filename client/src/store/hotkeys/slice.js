import { createSlice } from '@reduxjs/toolkit';
import { defaultPreset } from '../../components/sound/sounds';
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
const createPreset = (id, name, drumString, PianoString) => {
    const newPreset = {
        id: id,
        name: name,
        drum: createNewHotkeys(drum, drumString),
        piano: createNewHotkeys(piano, PianoString),
    };
    return newPreset;
};

export const hotkeysSlice = createSlice({
    name: 'hotkeys',
    initialState,
    reducers: {
        setInstrument: (state, action) => {
            state.instrument = action.payload;
        },
        setActivePresets: (state, action) => {
            state.activePresets = action.payload;
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
                createPreset(
                    -3,
                    'Default G',
                    'QWER',
                    '-------Z-X-CV-B-N-MA-S-DF-G-H-JK-Q-WE',
                ),
                createPreset(
                    -4,
                    'Default Am',
                    'QWER',
                    '---------Z-XC-V-BN-M-A-SD-F-GH-J-K-Q-',
                ),
                createPreset(
                    -5,
                    'Default F',
                    'QWER',
                    '-----Z-X-CV-B-N-MA-S-DF-G-H-JK-Q-WE-R',
                ),
                // createPreset(
                //     -6,
                //     'Default D',
                //     'QWER',
                //     '--Z-X-CV-B-N-MA-S-DF-G-H-JK-Q-WE-R-T-',
                // ),
            ];
            if (!presetArray || presetArray.length === 0) {
                state.presets = newPresetArray;
                return;
            }

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
                console.log(pushedPreset);
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
    setActivePresets,
} = hotkeysSlice.actions;

export default hotkeysSlice.reducer;
