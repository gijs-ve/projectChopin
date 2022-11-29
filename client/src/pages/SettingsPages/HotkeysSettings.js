import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectHotkeys,
    addPreset,
    editHotkey,
    editPreset,
} from '../../store/hotkeys';
import { playSound } from '../../components/sound/soundFunctions';
import {
    PresetsSelection,
    SoundPlayer,
    HotkeySquare,
    HotkeySquareUnbound,
} from '../../components';
import { cnButton, cnButtonUnbound } from '../../components/classNames';

function HotkeysSettings() {
    const dispatch = useDispatch();
    const [changeActive, setChangeActive] = useState(false);
    const AddPresetSection = () => {
        return (
            <>
                <button
                    className={cnButton}
                    onClick={() => dispatch(addPreset())}
                >
                    Create new preset
                </button>
            </>
        );
    };
    const RenderSoundSection = (p) => {
        const [inChange, setInChange] = useState(false);
        const [inputPossible, setInputPossible] = useState(false);
        const { inputKey, changeActive, sectionName, output, currentPresetId } =
            p;
        const hotkeyObject = { sectionName, output, currentPresetId };
        const handleHotkeyChange = () => {
            setInChange(true);
        };
        const handleClick = () => {
            if (!inChange || !inputPossible) return;
            window.removeEventListener('keydown', handleInput, false);
            window.removeEventListener('click', handleClick, false);
            setInChange(false);
            setInputPossible(false);
        };
        const handleReset = () => {
            dispatch(editHotkey({ ...hotkeyObject, key: '-' }));
        };
        const handleInput = (e) => {
            if (!inChange) return;
            const { key } = e;
            setInChange(false);
            window.removeEventListener('keydown', handleInput, false);
            window.removeEventListener('click', handleClick, false);

            dispatch(editHotkey({ ...hotkeyObject, key }));
        };
        useEffect(() => {
            if (!inChange) return;
            window.addEventListener('keydown', handleInput, false);
            setInputPossible(true);
        }, [inChange]);

        useEffect(() => {
            if (!inChange || !inputPossible) return;
            window.addEventListener('click', handleClick, false);
        }, [inputPossible]);
        const checkKey = () => {
            if (!inputKey || inputKey === '-') {
                return (
                    <>
                        <HotkeySquareUnbound inputKey={'...'} />
                    </>
                );
            }
            return (
                <>
                    <HotkeySquare inputKey={inputKey} />
                </>
            );
        };
        return (
            <>
                {checkKey()}
                {changeActive ? (
                    <>
                        <button
                            type="button"
                            className={cnButton}
                            onClick={() => handleHotkeyChange()}
                        >
                            {inChange ? 'Enter new bind...' : 'Change'}
                        </button>
                        <button
                            type="button"
                            className={cnButton}
                            onClick={() => handleReset()}
                        >
                            Unbind key
                        </button>
                    </>
                ) : (
                    ''
                )}
            </>
        );
    };
    const RenderHotkeySection = (array, sectionName, currentPresetId) => {
        const [hotkeysVisible, setHotkeysVisisble] = useState(true);
        const output = array.map((i) => {
            return (
                <div
                    key={i.ouput}
                    className="hover:bg-gray-700 rounded-xl px-2 py-2"
                >
                    <h1
                        key={`${i.output}h1`}
                        className="text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    >
                        {i.displayName ? i.displayName : i.name}
                    </h1>

                    <RenderSoundSection
                        key={`${i.output}RenderSoundSection`}
                        inputKey={i.key}
                        changeActive={changeActive}
                        displayName={i.displayName}
                        sectionName={sectionName}
                        output={i.output}
                        currentPresetId={currentPresetId}
                    />

                    <button
                        onClick={() => playSound(i.output)}
                        type="button"
                        className={cnButton}
                    >
                        Listen
                    </button>
                </div>
            );
        });
        return (
            <>
                <button
                    className={`${cnButton} mt-8`}
                    onClick={() => setHotkeysVisisble(!hotkeysVisible)}
                >
                    {hotkeysVisible
                        ? `Hide ${sectionName}`
                        : `Show ${sectionName}`}
                </button>
                {hotkeysVisible ? output : ''}
                <br />
            </>
        );
    };
    const ChangePreset = (p) => {
        const { currentPresetId, currentPreset } = p;
        const [test, setTest] = useState(false);
        if (currentPresetId === 0) return;
        const savePreset = () => {
            dispatch(editPreset(currentPresetId, currentPreset));
        };
        if (!changeActive) {
            return (
                <>
                    <button
                        className={cnButton}
                        onClick={() => setChangeActive(true)}
                    >
                        Change preset
                    </button>
                </>
            );
        }
        return (
            <>
                <button
                    className={cnButton}
                    onClick={() => {
                        setChangeActive(false);
                        savePreset();
                    }}
                >
                    Save
                </button>
                <button className={cnButton} onClick={() => setTest(!test)}>
                    {test ? 'Mute sounds' : 'Try sounds'}
                </button>
                {test ? <SoundPlayer status={'settingsTest'} /> : ''}
            </>
        );
    };
    const RenderHotkeys = () => {
        const hotkeys = useSelector(selectHotkeys());
        if (!hotkeys) return;
        const { presets } = hotkeys;
        const currentPresetId = hotkeys.currentPreset;
        const currentPreset = presets.find((i) => {
            if (i.id === currentPresetId) return true;
        });
        return (
            <>
                <AddPresetSection />
                <PresetsSelection
                    currentPresetId={currentPresetId}
                    hotkeys={hotkeys}
                    addLabel={true}
                />
                <div className="mt-4">
                    <ChangePreset
                        currentPresetId={currentPresetId}
                        currentPreset={currentPreset}
                    />
                </div>
                {RenderHotkeySection(
                    currentPreset.drum,
                    'Drums',
                    currentPresetId,
                )}
                {RenderHotkeySection(
                    currentPreset.piano,
                    'Piano',
                    currentPresetId,
                )}
            </>
        );
    };

    return (
        <div className="pt-8 mt-4 px-2 bg-gray-500 rounded-xl">
            <RenderHotkeys />
        </div>
    );
}
export { HotkeysSettings };
