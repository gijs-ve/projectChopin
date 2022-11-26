import { PresetsPage } from '.';
import { useState } from 'react';
import { cnButton } from '../../components/classNames';
function SettingsPage() {
    const [presetsVisible, setPresetsVisible] = useState(false);

    return (
        <div className="overflow-hidden">
            <div>
                <button
                    className={cnButton}
                    onClick={() => setPresetsVisible(!presetsVisible)}
                >
                    Presets
                </button>
                {presetsVisible ? <PresetsPage /> : ''}
            </div>
        </div>
    );
}
export { SettingsPage };
