const convertHotkeysToString = (array, type) => {
    const stringedArray = array.map((i) => {
        if (!i.key) return '-';
        return i.key.toUpperCase();
    });
    return stringedArray.join('');
};

export { convertHotkeysToString };
