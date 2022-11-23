import { useSelector } from 'react-redux';
import { selectHotkeys } from '../store/hotkeys';
import { playSound } from '../components/sound/soundFunctions';
import { PresetsSelection } from '../components';

function SettingsPage() {
    const AddPresetButton = () => {
        return (
            <button className="inline-flex items-center px-6 py-3 ml-4 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create new preset
            </button>
        );
    };
    const RenderHotkeySection = (array, sectionName) => {
        const output = array.map((i) => {
            return (
                <div
                    key={i.ouput}
                    className="hover:bg-gray-700 rounded-xl px-2 py-2"
                >
                    <h1 className="text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
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
                    <button
                        onClick={() => playSound(i.output)}
                        type="button"
                        className="inline-flex items-center px-6 py-3 ml-4 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Listen
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
        const { presets } = hotkeys;
        const currentPresetId = hotkeys.currentPreset;
        const currentPreset = presets.find((i) => {
            if (i.id === currentPresetId) return true;
        });
        return (
            <>
                <AddPresetButton />
                <PresetsSelection hotkeys={hotkeys} />
                {RenderHotkeySection(currentPreset.drum, 'Drums')}
                {RenderHotkeySection(currentPreset.piano, 'Piano')}
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
