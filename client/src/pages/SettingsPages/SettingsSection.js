import { useState } from 'react';
import { whiteLabel } from '../../components/classNames';
function SettingsSection(p) {
    const [settingsVisible, setSettingsVisible] = useState(true);
    const { name } = p;
    const { Component } = p;
    return (
        <div>
            <div className={whiteLabel + ' pt-12 '}>
                <h1>{name}</h1>
                <h2
                    className="pl-2"
                    onClick={() => setSettingsVisible(!settingsVisible)}
                >
                    {settingsVisible ? '(hide)' : '(show)'}
                </h2>
            </div>
            {settingsVisible ? <Component /> : ''}
        </div>
    );
}
export { SettingsSection };
