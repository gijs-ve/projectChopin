import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    room: null,
    inRoom: false,
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
        setInRoom: (state, action) => {
            state.inRoom = true;
        },
    },
});

export const { setRoom, clearRoom, setInRoom } = multiplayerSlice.actions;

export default multiplayerSlice.reducer;
