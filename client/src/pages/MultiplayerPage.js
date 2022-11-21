import React from 'react';
import { io } from 'socket.io-client';

function MultiplayerPage() {
    socket = io();
    return <div>MultiplayerPage</div>;
}
export { MultiplayerPage };
