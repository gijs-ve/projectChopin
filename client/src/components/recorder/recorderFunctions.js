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
        const stringArray = i.split('/');
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
            (i) => i.output !== 'n' && i.output !== undefined,
        );
        return filteredArray;
    });
    console.log(objectArray);
};

export { convertOutputTableToStrings, convertStringsToOutputTable };
