import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { socketUrl } from '../config/constants';
import { setRoom, selectRoom } from '../store/multiplayer';

import { RenderRoom } from '../components';
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

function MultiplayerPage() {
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const room = useSelector(selectRoom());
    const [socket, setSocket] = useState(null);
    const [multiplayerFunctions, setMultiplayerFunctions] = useState(null);

    const [id, setId] = useState(' ');
    const dispatch = useDispatch();
    const recordStatus = useSelector(selectRecordStatus());

    useEffect(() => {
        const socket = io(socketUrl);
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
            if (!socket || !socket.connected) return;
            socket.emit('joinRoom', token, id);
        };
        const multiplayerFunctions = { createRoom, sendSound, joinRoom };

        setSocket(socket);
        setMultiplayerFunctions(multiplayerFunctions);
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
