import {
    HotkeysSettings,
    UserSettings,
    PresetsSettings,
    SettingsSection,
} from '.';
function SettingsPage() {
    return (
        <>
            <SettingsSection Component={UserSettings} name="User settings" />
            <SettingsSection
                Component={PresetsSettings}
                name="Active presets"
            />
            <SettingsSection Component={HotkeysSettings} name="Hotkeys" />
        </>
    );
}
export { SettingsPage };
