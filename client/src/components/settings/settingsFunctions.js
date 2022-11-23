const convertHotkeysToString = (array) => {
    const stringedArray = array.map((i) => {
        if (!i.key) return '-';
        return i.key.toUpperCase();
    });
    return stringedArray.join('');
};

export { convertHotkeysToString };
