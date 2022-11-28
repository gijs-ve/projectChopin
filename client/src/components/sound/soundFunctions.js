import { Howl, Howler } from 'howler';
import { defaultPreset } from './sounds';
const { drum, piano } = defaultPreset;
const sounds = [drum, piano];

const playSound = (source) => {
    new Howl({
        src: source,
        autoplay: true,
        volume: 0.5,
        html5: true,
        onend: function () {},
    });
};

const getAllSounds = () => {
    return sounds.flat();
};

const allSounds = getAllSounds();

const getTypeFromOutput = (sound) => {
    if (arrayHasSource(drum, sound)) {
        return 'drum';
    }
    if (arrayHasSource(piano, sound)) {
        return 'piano';
    }
};

const playRecorderSound = (name) => {
    let output = undefined;
    if (arrayHasOutput(drum, name)) {
        output = getOutput(drum, name);
    }
    if (arrayHasOutput(piano, name)) {
        output = getOutput(piano, name);
    }
    if (!output) return;
    playSound(output);
};

const arrayHasSource = (array, sound) => {
    const foundSource = array.find((i) => {
        if (sound === i.output) return true;
    });
    if (!foundSource) return false;
    return true;
};

const arrayHasOutput = (array, sound) => {
    const foundSource = array.find((i) => {
        if (sound === i.name) return true;
    });

    if (!foundSource) return false;
    return true;
};

const getHeightFromSound = (array, sound) => {
    const soundObject = array.find((i) => {
        if (i.output === sound) return true;
    });
    return soundObject.height;
};

const getOutput = (array, name) => {
    const soundObject = array.find((i) => {
        if (i.name === name) return true;
    });
    return soundObject.output;
};

const convertSoundToHeight = (sound) => {
    if (arrayHasSource(drum, sound)) {
        return getHeightFromSound(drum, sound);
    }
    if (arrayHasSource(piano, sound)) {
        return getHeightFromSound(piano, sound);
    }
};

const convertNameToHeight = (name) => {
    const sound = allSounds.find((i) => {
        if (i.name === name) return true;
        return false;
    });
    return sound.height;
};

const convertNameToOutput = (name) => {
    const sound = allSounds.find((i) => {
        if (i.name === name) return true;
        return false;
    });
    return sound.output;
};

const colorIsValidHexValue = (color) => {
    return /^#[0-9A-F]{6}$/i.test(color);
};

export {
    playSound,
    playRecorderSound,
    convertSoundToHeight,
    convertNameToHeight,
    convertNameToOutput,
    getAllSounds,
    getTypeFromOutput,
    colorIsValidHexValue,
};
