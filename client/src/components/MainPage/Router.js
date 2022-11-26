import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
    HomePage,
    SoloPage,
    RecordingsPage,
    SettingsPage,
    SignOutPage,
    MultiplayerPage,
} from '../../pages';
function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signout" element={<SignOutPage />} />
                <Route path="/solo" element={<SoloPage />} />
                <Route path="/multiplayer" element={<MultiplayerPage />} />
                <Route path="/recordings" element={<RecordingsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </>
    );
}

export { Router };
