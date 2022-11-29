import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    room: null,
};

export const multiplayerSlice = createSlice({
    name: 'multiplayer',
    initialState,
    reducers: {
        setRoom: (state, action) => {
            state.room = action.payload;
        },
        clearRoom: (state) => {
            state.room = null;
        },
    },
});

export const { setRoom, clearRoom } = multiplayerSlice.actions;

export default multiplayerSlice.reducer;
