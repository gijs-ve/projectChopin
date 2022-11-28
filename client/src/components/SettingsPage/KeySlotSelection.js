import React from 'react';
import { HotkeySquare, PresetsSlotSelection } from '.';

function KeySlotSelection(p) {
    const { data } = p;
    const { key, preset } = data;
    return (
        <div className="rounded-xl px-2 py-4 my-4 bg-gray-600 flex flex-wrap hover:bg-gray-700">
            <HotkeySquare inputKey={key} />{' '}
            <PresetsSlotSelection preset={preset} />
        </div>
    );
}

export { KeySlotSelection };
