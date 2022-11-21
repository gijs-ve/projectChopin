import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { socketUrl } from '../config/constants';
import { selectHotkeys } from '../store/hotkeys';
import { selectUser } from '../store/user';

function MultiplayerPage() {
    const [socket, setSocket] = useState(null);
    const user = useSelector(selectUser);
    useEffect(() => {
        const socket = io(socketUrl);
        setSocket(socket);
    }, []);
    console.log(user);
    const createRoom = () => {
        if (!socket || !socket.connected) return;
        socket.emit('createRoom');
    };
    return (
        <div className="App">
            <header className="app-header">Rooms</header>
            {socket ? (
                <>
                    <button>Create room</button> <button>Join room</button>
                </>
            ) : (
                <div>Attempting to connect...</div>
            )}
        </div>
    );
}
export { MultiplayerPage };
