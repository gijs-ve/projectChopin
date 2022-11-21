import { useEffect } from 'react';
import { playSound } from './soundFunctions';
import { hat4, kick } from './sounds';
import { selectHotkeys } from '../../store/hotkeys';
import { useDispatch, useSelector } from 'react-redux';

function SoundPlayer() {
    const hotkeys = useSelector(selectHotkeys());
    useEffect(() => {
        window.addEventListener('keydown', handleInput, false);
        return () => window.removeEventListener('keydown', handleInput, false);
    }, []);

    const handleInput = (e) => {
        const { key } = e;
        if (!hotkeys.drum) return;
        const drumKeys = hotkeys.drum.map((i) => {
            return i.key;
        });
        console.log(key);
        if (drumKeys.includes(key.toUpperCase())) {
            const soundToPlay = hotkeys.drum.find((i) => {
                if (i.key.toUpperCase() === key.toUpperCase()) return true;
            });
            playSound(soundToPlay.output);
        }
    };

    const RenderDrums = () => {
        return <></>;
    };
    return (
        <div>
            <RenderDrums />
        </div>
    );
}

export { SoundPlayer };
