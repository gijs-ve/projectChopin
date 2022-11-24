import React from 'react';
import { convertStringsToOutputTable } from '.';

function RecordListener() {
    convertStringsToOutputTable([
        '!5570^F4/!5740^G4/!5910^D5/!5960^E5/!6030^F5/!6110^D5/!6190^G5/!6300^G5/!6400^D5/!6410^E5/!6440^F5/!6480^D5/!6480^E5/!6530^F5/!6590^D5/!6600^E5/!6620^F5/#n^n/#n^n/#n^n/',
        '!500^GEN/!500^dfk/!530^dfh/!590^gth/!670^dfk/!680^dfh/!810^dfk/!810^gth/!820^dfh/!920^dfk/!940^dfh/!950^gth/!1560^gth/!1680^dfk/!1720^dfh/!1820^gth/!2000^dfh/!2060^gth/!2170^dfk/!2190^dfh/',
        '!500^GEN/!500^dfk/!570^dfh/!670^gth/!820^dfs/!960^gth/!1070^dfh/!1200^dfk/!1260^gth/!1410^dfs/!1570^gth/!1660^dfh/!1760^dfk/!1850^gth/!1980^dfs/!2120^gth/!2230^dfk/!2240^dfh/!2430^gth/!2520^dfs/',
    ]);
    return <div>RecordListener</div>;
}
export { RecordListener };
