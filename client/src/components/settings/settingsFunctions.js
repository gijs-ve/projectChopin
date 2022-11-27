const convertHotkeysToString = (array) => {
    const stringedArray = array.map((i) => {
        if (!i.key) return '-';
        return i.key.toUpperCase();
    });
    return stringedArray.join('');
};

const checkHexColor = (string) => {
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    if (!reg.test(string)) return false;
    return true;
};

export { convertHotkeysToString, checkHexColor };
