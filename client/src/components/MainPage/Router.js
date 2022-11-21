import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, SoloPage, SignUpPage, MultiplayerPage } from '../../pages';
function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<SoloPage />} />
            <Route path="/solo" element={<SoloPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/multiplayer" element={<MultiplayerPage />} />
        </Routes>
    );
}

export { Router };
