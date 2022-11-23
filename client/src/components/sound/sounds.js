//Drums
const hat = 'sound/steban/hat.mp3';
const hat2 = 'sound/steban/hat2.mp3';
const hat4 = 'sound/steban/hat4.mp3';
const kick = 'sound/steban/kick.mp3';
const snare = 'sound/steban/snare1.mp3';

//Piano
const aK3 = 'sound/piano/a#3.mp3';
const aK4 = 'sound/piano/a#4.mp3';
const aK5 = 'sound/piano/a#5.mp3';
const a3 = 'sound/piano/a3.mp3';
const a4 = 'sound/piano/a4.mp3';
const a5 = 'sound/piano/a5.mp3';
const bK3 = 'sound/piano/b#3.mp3';
const bK4 = 'sound/piano/b#4.mp3';
const bK5 = 'sound/piano/b#5.mp3';
const b3 = 'sound/piano/b3.mp3';
const b4 = 'sound/piano/b4.mp3';
const b5 = 'sound/piano/b5.mp3';
const cK3 = 'sound/piano/c#3.mp3';
const cK4 = 'sound/piano/c#4.mp3';
const cK5 = 'sound/piano/c#5.mp3';
const c3 = 'sound/piano/c3.mp3';
const c4 = 'sound/piano/c4.mp3';
const c5 = 'sound/piano/c5.mp3';
const c6 = 'sound/piano/c6.mp3';
const dK3 = 'sound/piano/d#3.mp3';
const dK4 = 'sound/piano/d#4.mp3';
const dK5 = 'sound/piano/d#5.mp3';
const d3 = 'sound/piano/d3.mp3';
const d4 = 'sound/piano/d4.mp3';
const d5 = 'sound/piano/d5.mp3';
const eK3 = 'sound/piano/e#3.mp3';
const eK4 = 'sound/piano/e#4.mp3';
const eK5 = 'sound/piano/e#5.mp3';
const e3 = 'sound/piano/e3.mp3';
const e4 = 'sound/piano/e4.mp3';
const e5 = 'sound/piano/e5.mp3';
const fK3 = 'sound/piano/f#3.mp3';
const fK4 = 'sound/piano/f#4.mp3';
const fK5 = 'sound/piano/f#5.mp3';
const f3 = 'sound/piano/f3.mp3';
const f4 = 'sound/piano/f4.mp3';
const f5 = 'sound/piano/f5.mp3';
const gK3 = 'sound/piano/g#3.mp3';
const gK4 = 'sound/piano/g#4.mp3';
const gK5 = 'sound/piano/g#5.mp3';
const g3 = 'sound/piano/g3.mp3';
const g4 = 'sound/piano/g4.mp3';
const g5 = 'sound/piano/g5.mp3';

const drumState = [
    { key: 'Q', output: kick, name: 'Default kick' },
    { key: 'W', output: hat4, name: 'Default hat' },
    { key: 'E', output: hat, name: 'Gentle hat' },
    { key: 'R', output: snare, name: 'Default snare' },
];

const pianoState = [
    { key: 'A', output: c4, name: 'C4' },
    { key: 'S', output: d4, name: 'D4' },
    { key: 'D', output: e4, name: 'E4' },
    { key: 'F', output: f4, name: 'F4' },
    { key: 'G', output: g4, name: 'G4' },
    { key: 'H', output: a4, name: 'A4' },
    { key: 'J', output: b4, name: 'B4' },
    { key: 'K', output: c5, name: 'C5' },
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
