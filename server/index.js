const corsMiddleWare = require('cors');

//Server setup
const express = require('express');
const app = express();
const { PORT } = require('./config/constants');
const { toData } = require('./auth/jwt');
const Users = require('./models/').users;

//Socket setup
const io = require('socket.io')(4001, {
    cors: {
        origin: ['http://localhost:3000', 'http://192.168.0.118:3000'],
    },
});
const { v4 } = require('uuid');
let rooms = [];

//Routers
const authRouter = require('./routers/auth');
const hotkeysRouter = require('./routers/hotkeys');

app.use(corsMiddleWare());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/hotkeys', hotkeysRouter);

io.on('connection', (socket) => {
    socket.on('createRoom', async (token) => {
        try {
            const JWTData = toData(token);
            const findUser = async () => {
                const user = await Users.findByPk(JWTData.userId);
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
                users: [{ name: user.name, id: socket.id }],
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
                const user = await Users.findByPk(JWTData.userId);
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
            const newPlayer = { name: user.name, id: socket.id };
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
            socket.emit('receiveSound', sound);
            socket.to(roomId).emit('receiveSound', sound);
        } catch (error) {}
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
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
