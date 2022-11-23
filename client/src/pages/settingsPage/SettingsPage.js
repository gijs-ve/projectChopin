import { PresetsPage } from '.';
import { useState } from 'react';
import { cnButton } from '../../components/classNames';
function SettingsPage() {
    const [presetsVisible, setPresetsVisible] = useState(false);

    return (
        <div>
            <button
                className={cnButton}
                onClick={() => setPresetsVisible(!presetsVisible)}
            >
                Presets
            </button>
            {presetsVisible ? <PresetsPage /> : 'Test'}
        </div>
    );
}
export { SettingsPage };
