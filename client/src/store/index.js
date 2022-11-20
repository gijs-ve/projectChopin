import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appState/slice';

const store = configureStore({
    reducer: { appState: appReducer },
});

export default store;
