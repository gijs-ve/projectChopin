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
        socket.on('CreatedRoom', (newRoom) => {
            dispatch(setRoom(newRoom));
        });
        socket.on('RoomUpdate', (newRoom) => {
            console.log(newRoom);
            dispatch(setRoom(newRoom));
        });
    }, []);
    if (!user || !token) return;
    const createRoom = () => {
        if (!socket || !socket.connected) return;
        socket.emit('createRoom', token);
    };
    const joinRoom = () => {
        if (!socket || !socket.connected) return;
        socket.emit('joinRoom', token, id);
    };

    const RenderRoom = () => {
        if (!room) {
            return (
                <div className="App">
                    <header className="app-header">Rooms</header>
                    {socket ? (
                        <>
                            <button onClick={() => createRoom()}>
                                Create room
                            </button>{' '}
                            <br />
                            <input
                                type="id"
                                placeholder="Room ID"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                            <button onClick={() => joinRoom()}>
                                Join room
                            </button>
                        </>
                    ) : (
                        <div>Attempting to connect...</div>
                    )}
                </div>
            );
        }
        console.log(room);
        const HostOrNot = (i) => {
            if (i.name === room.hostName) {
                return (
                    <>
                        <h1>(HOST) {i.name}</h1>
                    </>
                );
            }
            return (
                <>
                    <h1>{i.name}</h1>
                </>
            );
        };
        const RenderUsers = () => {
            const Users = room.users.map((i) => {
                return (
                    <div key={i.id}>
                        <HostOrNot name={i.name} />
                    </div>
                );
            });
            return Users;
        };
        return (
            <>
                ID {room.roomId} | Room hosted by {room.hostName} <br />
                <button
                    onClick={() => navigator.clipboard.writeText(room.roomId)}
                >
                    Copy ID
                </button>
                <RenderUsers />
            </>
        );
    };

    return <RenderRoom />;
}
export { MultiplayerPage };
