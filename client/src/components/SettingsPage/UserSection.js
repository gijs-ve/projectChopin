import React from 'react';
import { whiteLabel } from '../../components/classNames';
import { Toggle } from './Toggle';

function UserSection(p) {
    const { name, type, settings, setSettings } = p;
    const TypeSetting = () => {
        if (type === 'boolean') {
            return (
                <>
                    <h1 className={whiteLabel}>{name}</h1>
                    <div className="py-2 pl-4 flex flex wrap">
                        <Toggle
                            settings={settings}
                            name={name}
                            setSettings={setSettings}
                        />
                    </div>
                </>
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
        <div className="hover:bg-gray-700 rounded-xl px-2 py-2">
            <TypeSetting />
        </div>
    );
}

export { UserSection };
