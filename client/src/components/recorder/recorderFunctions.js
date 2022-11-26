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
            string: '!500^GEN/!500^dfk/!530^dfh/!590^gth/!670^dfk/!680^dfh/!810^dfk/!810^gth/!820^dfh/!920^dfk/!940^dfh/!950^gth/!1560^gth/!1680^dfk/!1720^dfh/!1820^gth/!2000^dfh/!2060^gth/!2170^dfk/!2190^dfh/',
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
