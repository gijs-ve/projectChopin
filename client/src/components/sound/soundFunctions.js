import { Howl, Howler } from 'howler';

const playSound = (source) => {
    new Howl({
        src: source,
        autoplay: true,
        volume: 0.5,
        html5: true,
        onend: function () {
            console.log('Finished!');
        },
    });
};

export { playSound };
