import { Howl, Howler } from 'howler';
import { defaultPreset } from './sounds';
const playSound = (source) => {
    new Howl({
        src: source,
        autoplay: true,
        volume: 0.5,
        html5: true,
        onend: function () {},
    });
};

const { drum, piano } = defaultPreset;

const arrayHasSource = (array, sound) => {
    const foundSource = array.find((i) => {
        if (sound === i.output) return true;
    });
    if (!foundSource) return false;
    return true;
};

const getHeight = (array, sound) => {
    const soundObject = array.find((i) => {
        if (i.output === sound) return true;
    });
    return soundObject.height;
};

const convertSoundToHeight = (sound) => {
    if (arrayHasSource(drum, sound)) {
        return getHeight(drum, sound);
    }
    if (arrayHasSource(piano, sound)) {
        return getHeight(piano, sound);
    }
};

export { playSound, convertSoundToHeight };
