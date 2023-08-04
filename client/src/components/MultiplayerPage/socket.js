import React from 'react';
import io from 'socket.io-client';
import { socketUrl } from '../../config/constants';

export const socket = io(socketUrl, {
    transports: ['websocket'],
    extraHeaders: {
        'Access-Control-Allow-Origin': '*',
    },
});
export const SocketContext = React.createContext(socket);
