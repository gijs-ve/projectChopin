import { useState } from 'react';
import { whiteLabel } from '../../components/classNames';

function UserSettings() {
    const [settings, setSettings] = useState();
    return (
        <div className="px-2 py-2">
            <h1 className={whiteLabel}>ImageURL</h1>
            <h1 className={whiteLabel}>Hex Color</h1>
            <h1 className={whiteLabel}>Enable instrument buttons</h1>
            <h1 className={whiteLabel}>Show displayer</h1>
            <h1 className={whiteLabel}>Show recorder</h1>
        </div>
    );
}

export { UserSettings };
