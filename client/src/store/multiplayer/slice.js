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
    },
});

export const { setRoom } = multiplayerSlice.actions;

export default multiplayerSlice.reducer;
