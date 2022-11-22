import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHotkeys } from '../store/hotkeys';
import { PlusIcon as PlusIconMini } from '@heroicons/react/20/solid';
import { PlusIcon as PlusIconOutline } from '@heroicons/react/24/outline';

function SettingsPage() {
    const RenderHotkeySection = (array, sectionName) => {
        const output = array.map((i) => {
            return (
                <div key={i.ouput} className="border-2">
                    <h1 className="text-white-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
                        {i.name}
                    </h1>
                    <button
                        type="button"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {i.key}
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center px-6 py-3 ml-4 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Change
                    </button>
                </div>
            );
        });
        return (
            <>
                <h1>{sectionName}</h1>
                {output}
            </>
        );
    };
    const RenderHotkeys = () => {
        const hotkeys = useSelector(selectHotkeys());
        if (!hotkeys) return;
        return (
            <>
                {RenderHotkeySection(hotkeys.drum, 'Drums')}
                {RenderHotkeySection(hotkeys.piano, 'Piano')}
            </>
        );
    };

    return (
        <div>
            <RenderHotkeys />
        </div>
    );
}
export { SettingsPage };
