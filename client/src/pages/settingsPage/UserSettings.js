import { useState } from 'react';
import { whiteLabel } from '../../components/classNames';
import { UserSection } from '../../components';

function UserSettings() {
    // const userSettings = {
    //     [{imageUrl: , name:ImageURL }
    //         {imageUrl: , name:ImageURL }]
    // }
    const [settings, setSettings] = useState();
    return (
        <div className="py-4 my-4 px-2 bg-gray-500 rounded-xl">
            <UserSection name="ImageURL" />
            <UserSection name="Hex color" />
            <UserSection name="Enable instrument" />
            <UserSection name="Show displayer" />
            <UserSection name="Show recorder" />
        </div>
    );
}

export { UserSettings };
