import { defaultPreset } from '../sound/sounds';
import { arrayHasSource } from '../sound/soundFunctions';
const { drum, piano } = defaultPreset;

const getString = (array, name) => {};
const convertNameToRecordString = (name) => {
    if (arrayHasSource(drum, name)) {
        return getString(drum, name);
    }
    if (arrayHasSource(piano, name)) {
        return getString(piano, name);
    }
};
