import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { socketUrl } from '../config/constants';
import { setRoom, selectRoom } from '../store/multiplayer';
import { selectHotkeys } from '../store/hotkeys';
import { selectUser, selectToken } from '../store/user';

function MultiplayerPage() {
    const [socket, setSocket] = useState(null);
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const room = useSelector(selectRoom());
    const [id, setId] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io(socketUrl);
        setSocket(socket);
        socket.on('CreatedRoom', (roomId) => {
            dispatch(setRoom(roomId));
        });
    }, []);
    if (!user || !token) return;
    const createRoom = () => {
        if (!socket || !socket.connected) return;
        socket.emit('createRoom', token);
    };

    return (
        <div className="App">
            <header className="app-header">Rooms</header>
            {socket ? (
                <>
                    <button onClick={() => createRoom()}>Create room</button>{' '}
                    <br />
                    <input
                        type="id"
                        placeholder="Room ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <button>Join room</button>
                </>
            ) : (
                <div>Attempting to connect...</div>
            )}
        </div>
    );
}
export { MultiplayerPage };
