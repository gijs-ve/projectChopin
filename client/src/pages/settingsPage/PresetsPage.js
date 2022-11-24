import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectHotkeys,
    addPreset,
    editHotkey,
    editPreset,
} from '../../store/hotkeys';
import { playSound } from '../../components/sound/soundFunctions';
import { PresetsSelection, SoundPlayer } from '../../components';
import { cnButton, cnButtonUnbound } from '../../components/classNames';

function PresetsPage() {
    const dispatch = useDispatch();
    const [changeActive, setChangeActive] = useState(false);
    const AddPresetSection = () => {
        const [presetName, setPresetName] = useState('');
        return (
            <>
                <input
                    type="text"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                />
                <button
                    className={cnButton}
                    onClick={() => dispatch(addPreset(presetName))}
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
        console.log(p);
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
                        <button type="button" className={cnButtonUnbound}>
                            Unbound
                        </button>
                    </>
                );
            }
            return (
                <>
                    <button type="button" className={cnButton}>
                        {inputKey}
                    </button>
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
    const RenderHotkeySection = (
        array,
        sectionName,
        currentPreset,
        currentPresetId,
    ) => {
        const [hotkeysVisible, setHotkeysVisisble] = useState(true);
        const output = array.map((i) => {
            console.log(i);
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
                <button className={cnButton} onClick={() => savePreset()}>
                    Save
                </button>
                <button className={cnButton} onClick={() => setTest(!test)}>
                    {test ? 'Stop test' : 'Test hotkeys'}
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
                <PresetsSelection
                    currentPresetId={currentPresetId}
                    hotkeys={hotkeys}
                />
                <div className="mt-4">
                    <AddPresetSection />{' '}
                    <ChangePreset
                        currentPresetId={currentPresetId}
                        currentPreset={currentPreset}
                    />
                </div>
                {RenderHotkeySection(
                    currentPreset.drum,
                    'Drums',
                    currentPreset,
                    currentPresetId,
                )}
                {RenderHotkeySection(
                    currentPreset.piano,
                    'Piano',
                    currentPreset,
                    currentPresetId,
                )}
            </>
        );
    };

    return (
        <div>
            <RenderHotkeys />
        </div>
    );
}
export { PresetsPage };
