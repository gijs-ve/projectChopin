import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, SoloPage, SignUpPage } from '../../pages';
function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<SoloPage />} />
            <Route path="/solo" element={<SoloPage />} />
            <Route path="/signup" element={<SignUpPage />} />
        </Routes>
    );
}

export { Router };
