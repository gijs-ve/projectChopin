import { configureStore } from '@reduxjs/toolkit';

import appStateReducer from './appState/slice';
import userReducer from './user/slice';
import hotkeysReducer from './hotkeys/slice';

const store = configureStore({
    reducer: {
        appState: appStateReducer,
        user: userReducer,
        hotkeys: hotkeysReducer,
    },
});

export default store;
