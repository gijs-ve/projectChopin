import React from 'react';
import { cnHotkeySquareUnbound } from '../classNames';
function HotkeySquareUnbound(p) {
    return <div className={cnHotkeySquareUnbound}>{p.inputKey}</div>;
}
export { HotkeySquareUnbound };
