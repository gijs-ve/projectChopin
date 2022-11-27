import { HotkeysSettings, UserSettings } from '.';
import { useState } from 'react';
import { cnButton, whiteLabel } from '../../components/classNames';
import { convertOutputTableToStrings } from '../../components';
function SettingsPage() {
    const [userSettingsVisible, setUserSettingsVisible] = useState(false);
    const [hotkeysVisible, setHotkeysVisible] = useState(false);

    return (
        <>
            <div>
                <div className={whiteLabel + ' pt-12'}>
                    <h1>User settings</h1>
                    <h2
                        className="pl-2"
                        onClick={() =>
                            setUserSettingsVisible(!userSettingsVisible)
                        }
                    >
                        {userSettingsVisible ? '(hide)' : '(show)'}
                    </h2>
                </div>
                {userSettingsVisible ? <UserSettings /> : ''}
            </div>
            <div>
                <div className={whiteLabel + ' pt-12'}>
                    <h1>Hotkeys </h1>
                    <h2
                        className="pl-2"
                        onClick={() => setHotkeysVisible(!hotkeysVisible)}
                    >
                        {hotkeysVisible ? '(hide)' : '(show)'}
                    </h2>
                </div>
                {hotkeysVisible ? <HotkeysSettings /> : ''}
            </div>
        </>
    );
}
export { SettingsPage };
