import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    drum: null,
    piano: null,
    strings: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

export const { loginSuccess, logOut, tokenStillValid } = userSlice.actions;

export default userSlice.reducer;
