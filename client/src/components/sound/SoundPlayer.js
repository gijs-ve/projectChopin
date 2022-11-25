import { useEffect } from 'react';
import { playSound } from './soundFunctions';
import {
    selectHotkeys,
    selectInstrument,
    setInstrument,
    setPreset,
    addSound,
    selectRecordStatus,
    addRecord,
} from '../../store/';
import { useDispatch, useSelector } from 'react-redux';
import { Piano } from '../../components';

function SoundPlayer(p) {
    const dispatch = useDispatch();
    const hotkeys = useSelector(selectHotkeys());
    const instrument = useSelector(selectInstrument());
    const recordStatus = useSelector(selectRecordStatus());
    const { presets, activePresets } = hotkeys;
    const currentPresetId = hotkeys.currentPreset;
    const { status } = p;

    useEffect(() => {
        const currentPreset = presets.find((i) => {
            if (i.id === currentPresetId) return true;
        });
        const handleInstrument = (instrument) => {
            dispatch(setInstrument(instrument));
        };
        const handlePresetSwitch = (key) => {
            dispatch(setPreset(key));
        };
        const handleSound = (soundToPlay) => {
            const { sendSound, roomId } = p;
            if (!sendSound || !roomId) {
                playSound(soundToPlay.output);
                dispatch(
                    addSound({
                        output: soundToPlay.output,
                        origin: 'self',
                        height: soundToPlay.height,
                    }),
                );
                if (!recordStatus) return;
                dispatch(
                    addRecord({
                        soundName: soundToPlay.name,
                    }),
                );
                return;
            }
            sendSound(soundToPlay.output, roomId);
        };
        const handleInput = (e) => {
            if (!instrument || !hotkeys) return;
            const { key } = e;
            const checkKeys = (array) => {
                if (!array) return;
                const soundKeys = array.map((i) => {
                    return i.key;
                });
                const noNullSoundKeys = soundKeys.filter((i) => {
                    if (!i) return false;
                    return true;
                });
                if (noNullSoundKeys.includes(key.toUpperCase())) {
                    const soundToPlay = array.find((i) => {
                        if (i.key === null) return false;
                        if (i.key.toUpperCase() === key.toUpperCase())
                            return true;
                    });
                    handleSound(soundToPlay);
                }
                const instrumentKeys = ['!', '@', '#'];
                if (instrumentKeys.includes(key)) {
                    switch (key) {
                        case '!':
                            handleInstrument('drum');
                            break;
                        case '@':
                            handleInstrument('piano');
                            break;
                    }
                }
                const presetKeys = activePresets.map((i) => {
                    return i.key;
                });
                if (presetKeys.includes(key)) {
                    handlePresetSwitch(key);
                }
            };
            switch (instrument) {
                case 'drum':
                    checkKeys(currentPreset.drum);
                    break;
                case 'piano':
                    checkKeys(currentPreset.piano);
                    break;
            }
        };

        window.addEventListener('keydown', handleInput, false);
        return () => window.removeEventListener('keydown', handleInput, false);
    }, [hotkeys, instrument, recordStatus]);
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
        if (status === 'settingsTest') return;
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
