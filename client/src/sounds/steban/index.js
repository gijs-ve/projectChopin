import { Howl } from 'howler';

const hat = new Howl({
    src: ['/hat.wav'],
    html5: true,
});

const hat2 = new Howl({
    src: ['/hat2.wav'],
    html5: true,
});

export { hat, hat2 };
