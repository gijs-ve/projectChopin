import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
    HomePage,
    SoloPage,
    LoginPage,
    SignUpPage,
    SignOutPage,
    MultiplayerPage,
} from '../../pages';
function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signout" element={<SignOutPage />} />
            <Route path="/solo" element={<SoloPage />} />
            <Route path="/multiplayer" element={<MultiplayerPage />} />
        </Routes>
    );
}

export { Router };
