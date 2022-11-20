import React from 'react';
import { Routes, Route } from 'react-router-dom';
function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solo" element={<SoloPage />} />
            <Route path="/signup" element={<SignUpPage />} />
        </Routes>
    );
}

export { Router };
