import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { socketUrl } from '../config/constants';
import { setRoom, selectRoom } from '../store/multiplayer';
import { selectHotkeys } from '../store/hotkeys';
import { SoundPlayer } from '../components/sound/SoundPlayer';
import { selectUser, selectToken } from '../store/user';
import { playSound } from '../components/sound/soundFunctions';

function MultiplayerPage() {
    const [socket, setSocket] = useState(null);
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const room = useSelector(selectRoom());

    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io(socketUrl);
        setSocket(socket);
        socket.on('createdRoom', (newRoom) => {
            dispatch(setRoom(newRoom));
        });
        socket.on('roomUpdate', (newRoom) => {
            console.log(newRoom);
            dispatch(setRoom(newRoom));
        });
        socket.on('receiveSound', (sound) => {
            console.log(sound);
            playSound(sound);
        });
    }, []);
    if (!user || !token) return;
    const createRoom = () => {
        if (!socket || !socket.connected) return;
        socket.emit('createRoom', token);
    };

    const sendSound = (sound, roomdId) => {
        if (!socket || !socket.connected) return;
        socket.emit('sendSound', sound, roomdId);
    };
    const RenderRoom = () => {
        const [id, setId] = useState('');
        const joinRoom = () => {
            if (!socket || !socket.connected) return;
            socket.emit('joinRoom', token, id);
        };
        if (!room) {
            return (
                <div className="App">
                    <header className="app-header">Rooms</header>
                    {socket ? (
                        <>
                            <button onClick={() => createRoom()}>
                                Create room
                            </button>
                            <br />
                            <form>
                                <input
                                    placeholder="Room ID"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </form>
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
                <button
                    onClick={() =>
                        sendSound('sound/steban/hat4.mp3', room.roomId)
                    }
                >
                    TEST
                </button>
                <SoundPlayer sendSound={sendSound} roomId={room.roomId} />
                <RenderUsers />
            </>
        );
    };

    return <RenderRoom />;
}
export { MultiplayerPage };
