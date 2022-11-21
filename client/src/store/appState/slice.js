import { createSlice } from '@reduxjs/toolkit';
import { navigation } from '../../config/navigation';

const mappedNavigation = navigation.map((i) => {
    return { name: i.name, current: i.current };
});

const initialState = {
    loading: false,
    message: null,
    navigation: mappedNavigation,
};

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        appLoading: (state) => {
            state.loading = true;
        },
        appDoneLoading: (state) => {
            state.loading = false;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        clearMessage: (state, action) => {
            state.message = null;
        },
        setNavigation: (state, action) => {
            console.log(action.payload);
            const changedPage = state.navigation.find((i) => {
                if (i.name === action.payload) return true;
            });
            const returnedArray = state.navigation.map((i) => {
                if (i.name !== changedPage.name)
                    return { ...i, current: false };
                return { ...changedPage, current: true };
            });
            state.navigation = returnedArray;
        },
    },
});

export const {
    appLoading,
    appDoneLoading,
    setMessage,
    clearMessage,
    setNavigation,
} = appStateSlice.actions;

export default appStateSlice.reducer;
