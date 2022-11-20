import { playSound } from './soundFunctions';
import { hat4, kick } from './sounds';

function SoundPlayer() {
    const RenderPlaySoundButton = () => {
        return (
            <>
                <button onClick={() => playSound(kick)}>Test4242</button>
                <button onClick={() => playSound(hat4)}>Test4242</button>
            </>
        );
    };
    return (
        <div>
            <RenderPlaySoundButton />
        </div>
    );
}

export { SoundPlayer };
