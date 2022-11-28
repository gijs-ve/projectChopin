import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { socketUrl } from '../config/constants';
import { setRoom, selectRoom } from '../store/multiplayer';

import {
    SoundPlayer,
    Displayer,
    Recorder,
    RecordListener,
} from '../components';
import {
    selectUser,
    selectToken,
    addSound,
    addRecord,
    selectRecordStatus,
} from '../store/';
import {
    playSound,
    convertSoundToHeight,
    convertOutputToName,
} from '../components/sound/soundFunctions';

const RenderRoom = (p) => {
    const { setId, id, room, socket, multiplayerFunctions } = p;
    if (!id || !room || !socket || !multiplayerFunctions)
        if (!room) {
            return (
                <div className="App">
                    <header className="app-header">Rooms</header>
                    {socket ? (
                        <>
                            <button
                                onClick={() =>
                                    multiplayerFunctions.createRoom()
                                }
                            >
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
                            <button
                                onClick={() => multiplayerFunctions.joinRoom()}
                            >
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
            <button onClick={() => navigator.clipboard.writeText(room.roomId)}>
                Copy ID
            </button>
            <SoundPlayer
                status="active"
                sendSound={multiplayerFunctions.sendSound}
                roomId={room.roomId}
            />
            <Displayer />
            <div className="flex flex-wrap">
                <Recorder />
                <RecordListener
                    status="multiplayer"
                    sendSound={multiplayerFunctions.sendSound}
                    roomId={room.roomId}
                />
            </div>
            <RenderUsers />
        </>
    );
};

function MultiplayerPage() {
    const [socket, setSocket] = useState(null);
    const [multiplayerFunctions, setMultiplayerFunctions] = useState(null);
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const room = useSelector(selectRoom());
    const [id, setId] = useState('');
    const dispatch = useDispatch();
    const recordStatus = useSelector(selectRecordStatus());

    useEffect(() => {
        const socket = io(socketUrl);
        setSocket(socket);
        socket.on('createdRoom', (newRoom) => {
            dispatch(setRoom(newRoom));
        });
        socket.on('roomUpdate', (newRoom) => {
            dispatch(setRoom(newRoom));
        });
        socket.on('receiveSound', (sound) => {
            playSound(sound);
            const height = convertSoundToHeight(sound);

            dispatch(
                addSound({
                    output: sound,
                    origin: undefined,
                    height,
                }),
            );
            if (!recordStatus) return;
            dispatch(
                addRecord({
                    soundName: convertOutputToName(sound),
                }),
            );
            return;
        });
        if (!user || !token) return;
        const createRoom = () => {
            if (!socket || !socket.connected) return;
            socket.emit('createRoom', token);
        };

        const sendSound = (sound, roomdId) => {
            if (!socket || !socket.connected) return;
            socket.emit('sendSound', sound, roomdId);
        };
        const joinRoom = () => {
            if (!socket || !socket.connected) return;
            console.log(id);
            socket.emit('joinRoom', token, id);
        };
        setMultiplayerFunctions({ createRoom, sendSound, joinRoom });
    }, [id]);
    if (!multiplayerFunctions) return;

    return (
        <RenderRoom
            setId={setId}
            id={id}
            socket={socket}
            room={room}
            multiplayerFunctions={multiplayerFunctions}
        />
    );
}
export { MultiplayerPage };
