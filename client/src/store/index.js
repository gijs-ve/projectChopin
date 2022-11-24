import { configureStore } from '@reduxjs/toolkit';

import appStateReducer from './appState/slice';
import userReducer from './user/slice';
import hotkeysReducer from './hotkeys/slice';
import multiplayerReducer from './multiplayer/slice';
import displayerReducer from './displayer/slice';
import recorderReducer from './recorder/slice';

const store = configureStore({
    reducer: {
        appState: appStateReducer,
        user: userReducer,
        hotkeys: hotkeysReducer,
        multiplayer: multiplayerReducer,
        displayer: displayerReducer,
        recorder: recorderReducer,
    },
});

export default store;
export * from './user';
export * from './appState';
export * from './multiplayer';
export * from './hotkeys';
export * from './displayer';
export * from './recorder';
