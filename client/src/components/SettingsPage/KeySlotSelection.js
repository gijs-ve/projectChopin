import React from 'react';
import { HotkeySquare, PresetsSlotSelection } from '.';

function KeySlotSelection(p) {
    const { data, keySlots, setKeySlots } = p;
    const { key, preset } = data;
    const presetData = { preset, keySlots, setKeySlots, key };

    return (
        <div className="flex flex-wrap hover:bg-gray-700 bg-gray-600 my-4 mx-4 rounded-xl px-4 py-4">
            <HotkeySquare inputKey={key} />{' '}
            <PresetsSlotSelection data={presetData} />
        </div>
    );
}

export { KeySlotSelection };
