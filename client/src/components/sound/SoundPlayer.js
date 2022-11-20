import { Howl, Howler } from 'howler';
import { hat, hat2 } from '../../sounds/steban';
import React from 'react';

const playSound = () => {
    var hat3 = new Howl({
        src: ['/hat.wav'],
        html5: true,
    });
    hat3.play();
    Howler.volume(0.5);
};

function SoundPlayer() {
    return (
        <div>
            <button onClick={() => playSound()}>Test4242</button>
        </div>
    );
}

export { SoundPlayer };
