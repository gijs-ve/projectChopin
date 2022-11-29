import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    room: null,
    socket: { socket: null, multiplayerFunctions: null },
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
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
    },
});

export const { setRoom, clearRoom, setSocket } = multiplayerSlice.actions;

export default multiplayerSlice.reducer;
