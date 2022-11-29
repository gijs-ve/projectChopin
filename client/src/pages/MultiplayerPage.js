import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { socketUrl } from '../config/constants';
import { setRoom, selectRoom } from '../store/multiplayer';
import { roomText } from '../components/classNames';

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
    const [inputId, setInputId] = useState('');
    console.log(p);
    if (!room || !id || !socket || !multiplayerFunctions) {
        console.log('TEST');
        return (
            <div className="App">
                <header className="app-header">Rooms</header>
                {socket ? (
                    <>
                        <button
                            onClick={() => {
                                multiplayerFunctions.createRoom();
                            }}
                        >
                            Create room
                        </button>
                        <br />
                        <form>
                            <input
                                placeholder="Room ID"
                                value={inputId}
                                onChange={(e) => setInputId(e.target.value)}
                            />
                        </form>
                        <button
                            onClick={() => {
                                setId(inputId);
                                multiplayerFunctions.joinRoom();
                            }}
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
        console.log(i);
        if (i.name === room.hostName) {
            return (
                <>
                    <div className="flex flex-wrap bg-gray-300 hover:bg-gray-100">
                        <h1
                            className={`px-2 py-2 text-base font-medium text-sm`}
                            style={{ color: i.color }}
                        >
                            {i.name}
                        </h1>
                    </div>
                </>
            );
        }
        return (
            <>
                <div className="flex flex-wrap">
                    <h1
                        className={`px-2 py-2 text-base font-medium text-sm`}
                        style={{ color: i.color }}
                    >
                        {i.name}
                    </h1>
                </div>
            </>
        );
    };
    const RenderUsers = () => {
        const Users = room.users.map((i) => {
            return (
                <div
                    key={i.id}
                    className={`flex flex-wrap border-t-2 border-b-2 h-12`}
                >
                    <HostOrNot name={i.name} color={i.color} />
                </div>
            );
        });
        return Users;
    };
    if (!room || !room.roomId) return;
    return (
        <>
            <SoundPlayer
                status="active"
                sendSound={multiplayerFunctions.sendSound}
                roomId={room.roomId}
            />
            <div className="flex flex-row w-full">
                <Displayer className="w-11/12" />{' '}
                <div className={`w-1/12 border-t-2 border-b-2 border-r-2`}>
                    <div className={`${roomText}`}>{room.roomId}</div>
                    <div className="mt-4">
                        <RenderUsers />
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap">
                <Recorder />
                <RecordListener
                    status="multiplayer"
                    sendSound={multiplayerFunctions.sendSound}
                    roomId={room.roomId}
                />
            </div>
        </>
    );
};

function MultiplayerPage() {
    const [socket, setSocket] = useState(null);
    const [multiplayerFunctions, setMultiplayerFunctions] = useState(null);
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const room = useSelector(selectRoom());
    const [id, setId] = useState(' ');
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
        socket.on('receiveSound', (sound, color) => {
            playSound(sound);
            const height = convertSoundToHeight(sound);
            dispatch(
                addSound({
                    output: sound,
                    origin: undefined,
                    color,
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
            console.log(id);
            if (!socket || !socket.connected) return;
            socket.emit('joinRoom', token, id);
        };
        setMultiplayerFunctions({ createRoom, sendSound, joinRoom });
    }, [id]);
    console.log(multiplayerFunctions);
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
