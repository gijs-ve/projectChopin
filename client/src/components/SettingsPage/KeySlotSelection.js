import React from 'react';
import { HotkeySquare, PresetsSlotSelection } from '.';

function KeySlotSelection(p) {
    const { data, keySlots, setKeySlots } = p;
    const { key, preset } = data;
    const presetData = { preset, keySlots, setKeySlots, key };

    return (
        <div className="rounded-xl px-2 py-4 my-4 bg-gray-600 flex flex-wrap hover:bg-gray-700">
            <HotkeySquare inputKey={key} />{' '}
            <PresetsSlotSelection data={presetData} />
        </div>
    );
}

export { KeySlotSelection };
