require('dotenv').config();
const corsMiddleWare = require('cors');
const { Server } = require('socket.io');
//Server setup
const express = require('express');
const app = express();
// HTTP Server setup
const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT;
const { toData } = require('./auth/jwt');

//Models
const Users = require('./models/').users;
const Settings = require('./models/').settings;

//Socket setup
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Access-Control-Allow-Origin'],
    },
});
const { v4 } = require('uuid');
let rooms = [];

//Routers
const authRouter = require('./routers/auth');
const recordingsRouter = require('./routers/recordings');
const hotkeysRouter = require('./routers/hotkeys');
const settingsRouter = require('./routers/settings');

app.use(corsMiddleWare());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/hotkeys', hotkeysRouter);
app.use('/recordings', recordingsRouter);
app.use('/settings', settingsRouter);

io.on('connection', (socket) => {
    const isStringHexColor = require('./functions/getRandomImage');
    const getRandomColor = require('./functions/getRandomColor');
    const getPlayerColorFromId = require('./functions/getPlayerColorFromId');
    const getUsersFromRoom = require('./functions/getUsersFromRoom');

    socket.on('createRoom', async (token) => {
        try {
            const JWTData = toData(token);
            const findUser = async () => {
                const user = await Users.findByPk(JWTData.userId, {
                    include: [{ model: Settings, as: 'userSettings' }],
                });
                if (!user) {
                    return res
                        .status(404)
                        .send({ message: 'User does not exist' });
                }
                return user;
            };
            const user = await findUser();
            if (!user) return;
            const roomGuid = v4();
            const roomId = roomGuid.split('-')[0];
            const roomFound = rooms.find((i) => {
                if (i.host === user.name || i.roomId === roomId) return true;
            });
            if (roomFound) {
                rooms = rooms.filter((i) => {
                    if (
                        i.host === roomFound.host ||
                        i.roomId === roomFound.roomId
                    )
                        return false;
                    return true;
                });
            }
            const newRoom = {
                hostName: user.name,
                hostId: socket.id,
                roomId,
                users: [
                    {
                        name: user.name,
                        id: socket.id,
                        color: isStringHexColor(user.userSettings.color)
                            ? user.userSettings.color
                            : getRandomColor(),
                    },
                ],
            };
            rooms.push(newRoom);
            socket.join(roomId);
            socket.emit('createdRoom', newRoom);
        } catch (error) {
            console.log(error);
        }
    });
    socket.on('joinRoom', async (token, roomId) => {
        try {
            const JWTData = toData(token);
            const findUser = async () => {
                const user = await Users.findByPk(JWTData.userId, {
                    include: [{ model: Settings, as: 'userSettings' }],
                });
                if (!user) {
                    return null;
                }
                return user;
            };
            const user = await findUser();
            if (!user) return;
            const foundRoom = rooms.find((i) => {
                if (i.roomId === roomId) return true;
            });
            if (!foundRoom) return;
            const newPlayer = {
                name: user.name,
                id: socket.id,
                color: isStringHexColor(user.userSettings.color)
                    ? user.userSettings.color
                    : getRandomColor(),
            };
            foundRoom.users.push(newPlayer);
            socket.join(roomId);
            socket.emit('roomUpdate', foundRoom);
            socket.to(roomId).emit('roomUpdate', foundRoom);
        } catch (error) {
            console.log(error);
        }
    });
    socket.on('sendSound', (sound, roomId) => {
        try {
            const color = getPlayerColorFromId(socket.id, roomId, rooms);
            const roomUsers = getUsersFromRoom(roomId, rooms);
            roomUsers.map((i) => {
                if (i.id === socket.id) return;
                socket.to(i.id).emit('receiveSound', sound, color);
            });
            socket.emit('receiveSound', sound, color);
        } catch (error) {
            console.log(error);
        }
    });
    socket.on('disconnecting', () => {
        try {
            const disconnectedIds = socket.rooms;
            const newRoomList = rooms.map((i) => {
                const newUsers = i.users.filter((j) => {
                    if (disconnectedIds.has(j.id)) {
                        return false;
                    }
                    return true;
                });
                if (disconnectedIds.has(i.hostId)) {
                    const newHost = i.users.find((j) => {
                        if (i.hostId !== j.id) return true;
                        return false;
                    });
                    return {
                        ...i,
                        hostName: newHost.name,
                        hostId: newHost.id,
                        users: newUsers,
                    };
                }
                return { ...i, users: newUsers };
            });
            rooms = newRoomList;
            rooms.map((i) => {
                socket.to(i.roomId).emit('roomUpdate', i);
            });
        } catch (error) {
            console.log(error);
        }
    });
    socket.on('leaveRoom', () => {
        try {
            const disconnectedIds = socket.rooms;
            const unfilteredRoomList = rooms.map((i) => {
                const newUsers = i.users.filter((j) => {
                    if (disconnectedIds.has(j.id)) {
                        return false;
                    }
                    return true;
                });
                if (disconnectedIds.has(i.hostId)) {
                    const newHost = i.users.find((j) => {
                        if (i.hostId !== j.id) return true;
                        return false;
                    });
                    if (!newHost) return undefined;
                    return {
                        ...i,
                        hostName: newHost.name,
                        hostId: newHost.id,
                        users: newUsers,
                    };
                }
                return { ...i, users: newUsers };
            });
            const newRoomList = unfilteredRoomList.filter(
                (i) => i !== undefined,
            );
            rooms = newRoomList;
            rooms.map((i) => {
                socket.to(i.roomId).emit('roomUpdate', i);
            });

            socket.emit('roomUpdate', null);
        } catch (error) {
            console.log(error);
        }
    });
});
('');

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = server;
