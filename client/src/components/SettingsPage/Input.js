import { useState } from 'react';
import { checkHexColor } from '../settings/settingsFunctions';

function Input(p) {
    const { settings, name, setSettings } = p;
    const foundSetting = settings.find((i) => {
        if (i.name === name) return true;
    });
    const { setting, wide } = foundSetting;
    const handleOnBlur = () => {
        let testedInput = input;
        if (!wide) {
            if (!checkHexColor(input)) {
                testedInput = '#000000';
            }
        }
        const newSettings = settings.map((i) => {
            if (i.name !== name) return i;
            return { ...i, setting: testedInput };
        });
        setSettings(newSettings);
    };
    const [input, setInput] = useState(setting);
    return (
        <input
            className={wide ? 'w-1/4 focus:w-5/6' : 'w-1/12 focus:w-1/6'}
            value={input}
            onBlur={() => handleOnBlur()}
            onChange={(e) => setInput(e.target.value)}
            maxLength={wide ? 1000 : 7}
        />
    );
}

export { Input };
