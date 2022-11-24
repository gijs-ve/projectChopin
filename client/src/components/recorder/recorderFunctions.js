import { defaultPreset } from '../sound/sounds';

const convertSet = (array, workArray, setNumber) => {
    const stringArray = [];
    if (setNumber === 0) {
        for (let i = 0; i < 25; i++) {
            stringArray.push(array[i]);
        }
    }
    if (setNumber !== 0) {
        for (let i = setNumber * 25; i < setNumber * 25 + 25; i++) {
            stringArray.push(array[i]);
        }
    }
    workArray.push(stringArray.join(''));
};

const convertRawStringTable = (array) => {
    const amountOfSets = array.length / 25;
    const workArray = [];
    for (let i = 0; i < amountOfSets; i++) {
        convertSet(array, workArray, i);
    }
};
const convertOutputTableToStrings = (outputTable) => {
    const tableLength = outputTable.length;
    const lengthToAdd = 25 - (tableLength % 25);

    const rawStringTable = outputTable.map((i) => {
        return `#${i.time}^${i.output}/`;
    });

    if (lengthToAdd !== 25) {
        for (let i = 0; i < lengthToAdd; i++) {
            rawStringTable.push('#n^n/');
        }
    }
    const returnTable = convertRawStringTable(rawStringTable);
    return returnTable;
};

export { convertOutputTableToStrings };
