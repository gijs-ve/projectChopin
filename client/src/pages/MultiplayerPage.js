import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setRoom, selectRoom } from '../store/multiplayer';
import { SocketContext } from '../components/MultiplayerPage/socket';
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
    const socket = useContext(SocketContext);
    const [multiplayerFunctions, setMultiplayerFunctions] = useState(null);

    const [id, setId] = useState(' ');
    const dispatch = useDispatch();
    const recordStatus = useSelector(selectRecordStatus());

    useEffect(() => {
        if (room) return;
        socket.on('createdRoom', (newRoom) => {
            dispatch(setRoom(newRoom));
        });
        socket.on('roomUpdate', (newRoom) => {
            dispatch(setRoom(newRoom));
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
        const forceDisconnect = () => {
            if (!socket || !socket.connected) return;
            socket.emit('disconnectSelf');
        };
        const multiplayerFunctions = {
            createRoom,
            sendSound,
            joinRoom,
            forceDisconnect,
        };
        setMultiplayerFunctions(multiplayerFunctions);
    }, [id]);

    useEffect(() => {
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
    }, [recordStatus]);
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
