import {
    kick,
    hat4,
    hat,
    snare,
    c4,
    d4,
    e4,
    f4,
    g4,
    a4,
    b4,
    c5,
} from '../components/sound/sounds';

const url = 'http://192.168.0.118';
export const apiUrl = process.env.API_URL || `${url}:4000`;
export const socketUrl = `${url}:4001`;
export const DEFAULT_MESSAGE_TIMEOUT = 3000;

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
