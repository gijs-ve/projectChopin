import { configureStore } from '@reduxjs/toolkit';

import appStateReducer from './appState/slice';
import userReducer from './user/slice';

const store = configureStore({
    reducer: {
        appState: appStateReducer,
        user: userReducer,
    },
});

export default store;
