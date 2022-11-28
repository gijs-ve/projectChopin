import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SaveButton, KeySlotSelection } from '../../components';
import { selectUser } from '../../store';
function PresetsSettings() {
    const user = useSelector(selectUser);
    const { activePresets } = user.userSettings;
    const presets = activePresets.split('!');

    const [save, setSave] = useState(false);
    const [keySlots, setKeySlots] = useState([]);
    const [initialState, setInitialState] = useState([]);

    useEffect(() => {
        const keySlotsArray = [
            {
                key: '1',
                preset: presets[0],
            },
            {
                key: '2',
                preset: presets[1],
            },
            {
                key: '3',
                preset: presets[2],
            },
            {
                key: '4',
                preset: presets[3],
            },
            {
                key: '5',
                preset: presets[4],
            },
            {
                key: '6',
                preset: presets[5],
            },
            {
                key: '7',
                preset: presets[6],
            },
            {
                key: '8',
                preset: presets[7],
            },
            {
                key: '9',
                preset: presets[8],
            },
        ];
        setKeySlots(keySlotsArray);
        setInitialState(keySlotsArray);
    }, [activePresets]);
    useEffect(() => {
        console.log(keySlots);
        console.log(initialState);
        if (keySlots.length === 0 || !keySlots) return;
        const arrayEquals = (i, j) => {
            const iArray = i.map((k) => {
                return k.preset;
            });
            const jArray = j.map((k) => {
                return k.preset;
            });
            return JSON.stringify(iArray) === JSON.stringify(jArray);
        };
        if (arrayEquals(keySlots, initialState)) {
            setSave(false);
            return;
        }

        setSave(true);
        return;
    }, [keySlots]);
    return (
        <div className="py-4 my-4 px-2 bg-gray-500 rounded-xl">
            {save ? <SaveButton /> : ''}
            {keySlots.map((i) => {
                return (
                    <KeySlotSelection
                        data={i}
                        keySlots={keySlots}
                        setKeySlots={setKeySlots}
                    />
                );
            })}
        </div>
    );
}

export { PresetsSettings };
