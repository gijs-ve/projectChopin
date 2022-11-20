import { Howl, Howler } from 'howler';
import { hat, hat2 } from '../../sounds/steban';
import { useState } from 'react';

function SoundPlayer() {
    const [allowMusic, setAllowMusic] = useState(false);
    const RenderPlaySoundButton = () => {
        if (!allowMusic) return;
        const playSound = () => {
            const sound = new Howl({
                src: 'hat.wav',
                autoplay: true,
                loop: true,
                volume: 0.5,
                html5: true,
                onend: function () {
                    console.log('Finished!');
                },
            });
            sound.play();
        };
        return (
            <>
                <button onClick={() => playSound()}>Test4242</button>
            </>
        );
    };
    return (
        <div>
            <button onClick={() => setAllowMusic(!allowMusic)}>
                {allowMusic ? 'ON' : 'OFF'}
            </button>
            <RenderPlaySoundButton />
        </div>
    );
}

export { SoundPlayer };
