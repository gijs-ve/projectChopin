import React from 'react';
import { whiteLabel } from '../../components/classNames';
import { Toggle } from './Toggle';

function UserSection(p) {
    const { name, type, settings, setSettings } = p;
    const toggleSetting = () => {
        if (type !== 'boolean') return;
        const newSettings = settings.map((i) => {
            if (i.name === name) return { ...i, setting: !i.setting };
            return i;
        });
        setSettings(newSettings);
    };
    const TypeSetting = () => {
        if (type === 'boolean') {
            return (
                <div>
                    <h1 className={whiteLabel}>{name}</h1>
                    <div className="py-2 pl-4 flex flex wrap">
                        <Toggle
                            settings={settings}
                            name={name}
                            setSettings={setSettings}
                        />
                    </div>
                </div>
            );
        }
        if (type === 'input') {
            return (
                <>
                    <h1 className={whiteLabel}>{name}</h1>
                    <div className="py-2 pl-4 flex flex wrap">
                        <input />
                    </div>
                </>
            );
        }
    };
    return (
        <div
            className="hover:bg-gray-700 rounded-xl px-2 py-2"
            onClick={() => toggleSetting()}
        >
            <TypeSetting />
        </div>
    );
}

export { UserSection };
