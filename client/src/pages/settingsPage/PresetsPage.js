import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectHotkeys,
    addPreset,
    editHotkey,
    editPreset,
} from '../../store/hotkeys';
import { playSound } from '../../components/sound/soundFunctions';
import { PresetsSelection } from '../../components';
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
        const handleInput = (e) => {
            if (!inChange) return;
            const { key } = e;
            setInChange(false);
            window.removeEventListener('keydown', handleInput, false);
            window.removeEventListener('click', handleClick, false);
            console.log(p);
            const hotkeyObject = { key, sectionName, output, currentPresetId };
            dispatch(editHotkey(hotkeyObject));
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
                    <button
                        type="button"
                        className={cnButton}
                        onClick={() => handleHotkeyChange()}
                    >
                        {inChange ? 'Enter new bind...' : 'Change'}
                    </button>
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
        const output = array.map((i) => {
            return (
                <div
                    key={i.ouput}
                    className="hover:bg-gray-700 rounded-xl px-2 py-2"
                >
                    <h1 className="text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
                        {i.name}
                    </h1>
                    <RenderSoundSection
                        key={i.key}
                        inputKey={i.key}
                        changeActive={changeActive}
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
                <h1 className="text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
                    {sectionName}
                </h1>
                {output}
            </>
        );
    };
    const ChangePreset = (p) => {
        const { currentPresetId, currentPreset } = p;
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
                <PresetsSelection hotkeys={hotkeys} />
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
