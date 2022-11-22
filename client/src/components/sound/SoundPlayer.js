import { useEffect } from 'react';
import { playSound } from './soundFunctions';
import { hat4, kick } from './sounds';
import {
    selectHotkeys,
    selectInstrument,
    setInstrument,
} from '../../store/hotkeys';
import { useDispatch, useSelector } from 'react-redux';
import { Piano } from '../../components';

function SoundPlayer(p) {
    const dispatch = useDispatch();
    const hotkeys = useSelector(selectHotkeys());
    const instrument = useSelector(selectInstrument());

    useEffect(() => {
        const handleInstrument = (instrument) => {
            dispatch(setInstrument(instrument));
        };
        const handleSound = (soundToPlay) => {
            const { sendSound, roomId } = p;
            console.log(soundToPlay);
            if (!sendSound || !roomId) return playSound(soundToPlay.output);
            sendSound(soundToPlay.output, roomId);
        };
        const handleInput = (e) => {
            if (!instrument || !hotkeys) return;
            const { key } = e;
            console.log(instrument);
            const checkKeys = (array) => {
                if (!array) return;
                const knownKeys = array.map((i) => {
                    return i.key;
                });
                if (knownKeys.includes(key.toUpperCase())) {
                    const soundToPlay = array.find((i) => {
                        if (i.key.toUpperCase() === key.toUpperCase())
                            return true;
                    });
                    handleSound(soundToPlay);
                }
                const instrumentKeys = ['!', '@', '#'];
                if (instrumentKeys.includes(key)) {
                    if (key === '!') {
                        handleInstrument('drum');
                    }
                    if (key === '@') {
                        handleInstrument('piano');
                    }
                }
            };
            if (instrument === 'drum') {
                checkKeys(hotkeys.drum);
            }
            if (instrument === 'piano') {
                checkKeys(hotkeys.piano);
            }
        };

        window.addEventListener('keydown', handleInput, false);
        return () => window.removeEventListener('keydown', handleInput, false);
    }, [hotkeys, instrument]);
    const RenderButtons = () => {
        return (
            <>
                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Drums
                </button>
                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Piano
                </button>
            </>
        );
    };
    const RenderInstrument = () => {
        if (instrument === 'drum') return <>DRUM</>;
        if (instrument === 'piano') return <Piano />;
    };

    return (
        <div>
            <RenderButtons />
            <br />
            <RenderInstrument />
        </div>
    );
}

export { SoundPlayer };
