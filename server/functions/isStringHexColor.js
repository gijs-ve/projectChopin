const isStringHexColor = (string) => {
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    if (!reg.test(string)) return false;
    return true;
};
