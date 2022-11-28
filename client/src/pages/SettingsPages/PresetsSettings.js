import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserSection, SaveButton } from '../../components';
import { selectUser } from '../../store';
function PresetsSettings() {
    const user = useSelector(selectUser);
    const { userSettings } = user;

    const [settings, setSettings] = useState([]);
    const [initialState, setInitialState] = useState([]);
    const [save, setSave] = useState(false);
    useEffect(() => {
        const initialState = [
            {
                name: 'ImageURL',
                setting: userSettings.imageURL,
                type: 'input',
                wide: true,
            },
            {
                name: 'Hex color',
                setting: userSettings.color,
                type: 'input',
                wide: false,
            },
            {
                name: 'Enable instrument',
                setting: userSettings.showInstrumentButtons,
                type: 'boolean',
            },
            {
                name: 'Show presets',
                setting: userSettings.showPresetButtons,
                type: 'boolean',
            },
            {
                name: 'Show displayer',
                setting: userSettings.displayerOn,
                type: 'boolean',
            },
            {
                name: 'Show recorder',
                setting: userSettings.recordsOn,
                type: 'boolean',
            },
        ];
        setSettings(initialState);
        setInitialState(initialState);
    }, [userSettings]);
    useEffect(() => {
        if (settings.length === 0 || !settings) return;
        const arrayEquals = (i, j) => {
            const iArray = i.map((k) => {
                return k.setting;
            });
            const jArray = j.map((k) => {
                return k.setting;
            });
            return JSON.stringify(iArray) == JSON.stringify(jArray);
        };
        if (arrayEquals(settings, initialState)) {
            setSave(false);
            return;
        }
        setSave(true);
        return;
    }, [settings]);
    const Settings = () => {
        return (
            <>
                {settings.map((i) => {
                    return (
                        <UserSection
                            name={i.name}
                            type={i.type}
                            settings={settings}
                            setSettings={setSettings}
                            key={i.name}
                        />
                    );
                })}
            </>
        );
    };
    return (
        <div className="py-4 my-4 px-2 bg-gray-500 rounded-xl">
            {save ? <SaveButton /> : ''}
            <Settings />
        </div>
    );
}

export { PresetsSettings };
