//Drums
const hat = 'sound/steban/hat.mp3';
const hat2 = 'sound/steban/hat2.mp3';
const hat4 = 'sound/steban/hat4.mp3';
const kick = 'sound/steban/kick.mp3';
const snare = 'sound/steban/snare1.mp3';

//Piano
const aK3 = 'sound/piano/aK3.mp3';
const aK4 = 'sound/piano/aK4.mp3';
const aK5 = 'sound/piano/aK5.mp3';
const a3 = 'sound/piano/a3.mp3';
const a4 = 'sound/piano/a4.mp3';
const a5 = 'sound/piano/a5.mp3';
const b3 = 'sound/piano/b3.mp3';
const b4 = 'sound/piano/b4.mp3';
const b5 = 'sound/piano/b5.mp3';
const cK3 = 'sound/piano/cK3.mp3';
const cK4 = 'sound/piano/cK4.mp3';
const cK5 = 'sound/piano/cK5.mp3';
const c3 = 'sound/piano/c3.mp3';
const c4 = 'sound/piano/c4.mp3';
const c5 = 'sound/piano/c5.mp3';
const c6 = 'sound/piano/c6.mp3';
const dK3 = 'sound/piano/dK3.mp3';
const dK4 = 'sound/piano/dK4.mp3';
const dK5 = 'sound/piano/dK5.mp3';
const d3 = 'sound/piano/d3.mp3';
const d4 = 'sound/piano/d4.mp3';
const d5 = 'sound/piano/d5.mp3';
const e3 = 'sound/piano/e3.mp3';
const e4 = 'sound/piano/e4.mp3';
const e5 = 'sound/piano/e5.mp3';
const fK3 = 'sound/piano/fK3.mp3';
const fK4 = 'sound/piano/fK4.mp3';
const fK5 = 'sound/piano/fK5.mp3';
const f3 = 'sound/piano/f3.mp3';
const f4 = 'sound/piano/f4.mp3';
const f5 = 'sound/piano/f5.mp3';
const gK3 = 'sound/piano/gK3.mp3';
const gK4 = 'sound/piano/gK4.mp3';
const gK5 = 'sound/piano/gK5.mp3';
const g3 = 'sound/piano/g3.mp3';
const g4 = 'sound/piano/g4.mp3';
const g5 = 'sound/piano/g5.mp3';

const drumState = [
    {
        key: 'Q',
        output: kick,
        name: 'dfk',
        height: 88,
        displayName: 'Default kick',
    },
    {
        key: 'W',
        output: hat4,
        name: 'dfh',
        height: 86,
        displayName: 'Default hat',
    },
    {
        key: 'E',
        output: hat,
        name: 'gth',
        height: 84,
        displayName: 'Gentle hat',
    },
    {
        key: 'R',
        output: snare,
        name: 'dfs',
        height: 82,
        displayName: 'Default snare',
    },
];

const pianoState = [
    { key: 'Z', output: c3, name: 'C3', height: 74 },
    { key: null, output: cK3, name: 'C#3', height: 72 },
    { key: 'X', output: d3, name: 'D3', height: 70 },
    { key: null, output: dK3, name: 'D#3', height: 68 },
    { key: 'C', output: e3, name: 'E3', height: 66 },
    { key: 'V', output: f3, name: 'F3', height: 64 },
    { key: null, output: fK3, name: 'F#3', height: 62 },
    { key: 'B', output: g3, name: 'G3', height: 60 },
    { key: null, output: gK3, name: 'G#3', height: 58 },
    { key: 'N', output: a3, name: 'A3', height: 56 },
    { key: null, output: aK3, name: 'A#3', height: 54 },
    { key: 'M', output: b3, name: 'B3', height: 52 },
    { key: 'A', output: c4, name: 'C4', height: 50 },
    { key: null, output: cK4, name: 'C#4', height: 48 },
    { key: 'S', output: d4, name: 'D4', height: 46 },
    { key: null, output: dK4, name: 'D#4', height: 44 },
    { key: 'D', output: e4, name: 'E4', height: 42 },
    { key: 'F', output: f4, name: 'F4', height: 40 },
    { key: null, output: fK4, name: 'F#4', height: 38 },
    { key: 'G', output: g4, name: 'G4', height: 36 },
    { key: null, output: gK4, name: 'G#4', height: 34 },
    { key: 'H', output: a4, name: 'A4', height: 32 },
    { key: null, output: aK4, name: 'A#4', height: 30 },
    { key: 'J', output: b4, name: 'B4', height: 28 },
    { key: 'K', output: c5, name: 'C5', height: 26 },
    { key: null, output: cK5, name: 'C#5', height: 24 },
    { key: 'Q', output: d5, name: 'D5', height: 22 },
    { key: null, output: dK5, name: 'D#5', height: 20 },
    { key: 'W', output: e5, name: 'E5', height: 18 },
    { key: 'E', output: f5, name: 'F5', height: 16 },
    { key: null, output: fK5, name: 'F#5', height: 14 },
    { key: 'R', output: g5, name: 'G5', height: 12 },
    { key: null, output: gK5, name: 'G#5', height: 10 },
    { key: 'T', output: a5, name: 'A5', height: 8 },
    { key: null, output: aK5, name: 'A#5', height: 6 },
    { key: 'Y', output: b5, name: 'B5', height: 4 },
    { key: 'U', output: c6, name: 'C6', height: 2 },
];

const stringState = [
    { key: 'Q', output: kick, name: 'Default kick' },
    { key: 'W', output: hat4, name: 'Default kick' },
    { key: 'E', output: hat, name: 'Default kick' },
];
export const defaultPreset = {
    id: 0,
    name: 'default',
    drum: drumState,
    piano: pianoState,
    strings: stringState,
};
