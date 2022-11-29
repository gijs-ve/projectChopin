const setLength = 20;
const convertSet = (array, workArray, setNumber) => {
    const stringArray = [];
    if (setNumber === 0) {
        for (let i = 0; i < setLength; i++) {
            stringArray.push(array[i]);
        }
    }
    if (setNumber !== 0) {
        for (
            let i = setNumber * setLength;
            i < setNumber * setLength + setLength;
            i++
        ) {
            stringArray.push(array[i]);
        }
    }
    workArray.push(stringArray.join(''));
};
const convertRawStringTable = (array) => {
    const amountOfSets = array.length / setLength;
    const workArray = [];
    for (let i = 0; i < amountOfSets; i++) {
        convertSet(array, workArray, i);
    }
    return workArray;
};
const convertOutputTableToStrings = (outputTable) => {
    const tableLength = outputTable.length;
    const lengthToAdd = setLength - (tableLength % setLength);

    const rawStringTable = outputTable.map((i) => {
        return `!${i.time}^${i.output}/`;
    });

    if (lengthToAdd !== setLength) {
        for (let i = 0; i < lengthToAdd; i++) {
            rawStringTable.push('#n^n/');
        }
    }
    const returnTable = convertRawStringTable(rawStringTable);

    return returnTable;
};

const convertStringsToOutputTable = (stringArray) => {
    const workArray = stringArray.map((i) => {
        const stringArray = i.string.split('/');
        return stringArray;
    });
    const objectArray = workArray.map((i) => {
        const convertedArray = i.map((i) => {
            const string = i.replace('!', '');
            const splitString = string.split('^');
            const soundObject = {
                time: splitString[0],
                output: splitString[1],
            };
            return soundObject;
        });
        const filteredArray = convertedArray.filter(
            (i) =>
                i.output !== 'n' &&
                i.output !== undefined &&
                i.output !== 'GEN',
        );

        return filteredArray;
    });
    return objectArray.flat();
};

const generateDefaultRecording = () => {
    const recordstrings = [
        {
            string: '!100^GEN/!500^dfk/!830^gth/!1140^gth/!1490^gth/!1820^dfk/!2110^gth/!2450^gth/!2760^gth/!3090^dfk/!3400^gth/!3710^gth/!4040^gth/!4360^dfk/!4670^gth/!4990^gth/!5290^gth/!5610^dfk/!5920^gth/!6230^gth/',
        },
        {
            string: '!6520^gth/!6820^dfk/!7140^gth/!7460^gth/!7770^gth/!8070^dfk/!8370^gth/!8670^gth/!8980^gth/!9330^dfk/#n^n/#n^n/#n^n/#n^n/#n^n/#n^n/#n^n/#n^n/#n^n/#n^n/',
        },
    ];
    const defaultRecording = {
        id: 0,
        name: 'Default',
        recordstrings,
    };
    return defaultRecording;
};
const getDefaultRecording = () => {
    return generateDefaultRecording();
};

const getLengthFromRecordStrings = (stringArray) => {
    if (!stringArray) return;
    const outputTable = convertStringsToOutputTable(stringArray);
    outputTable.sort((i, j) => {
        return i.time - j.time;
    });
    const lastTime = outputTable[outputTable.length - 1];
    const minutes = Math.floor(lastTime.time / 60000);
    const seconds = ((lastTime.time % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
export {
    convertOutputTableToStrings,
    convertStringsToOutputTable,
    getDefaultRecording,
    getLengthFromRecordStrings,
};
