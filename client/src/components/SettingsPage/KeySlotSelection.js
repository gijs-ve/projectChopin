import React from 'react';
import { HotkeySquare, PresetsSlotSelection } from '.';

function KeySlotSelection(p) {
    const { data } = p;
    const { key, preset } = data;
    return (
        <div className="my-4 flex flex-wrap">
            <HotkeySquare inputKey={key} />{' '}
            <PresetsSlotSelection preset={preset} />
        </div>
    );
}

export { KeySlotSelection };
