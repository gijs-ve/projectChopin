import React from 'react';
import { cnHotkeySquare } from '../classNames';
function HotkeySquare(p) {
    return <div className={cnHotkeySquare}>{p.inputKey}</div>;
}
export { HotkeySquare };
