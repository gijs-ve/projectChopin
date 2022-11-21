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
        origin: ['http://localhost:3000'],
    },
});
const { v4 } = require('uuid');
let rooms = [];

//Routers
const authRouter = require('./routers/auth');

app.use(corsMiddleWare());
app.use(express.json());
app.use('/auth', authRouter);

io.on('connection', (socket) => {
    console.log('Rooms:', rooms);
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
                host: user.name,
                hostId: socket.id,
                roomId,
                users: [],
            };
            rooms.push(newRoom);
            socket.emit('CreatedRoom', newRoom);
        } catch (error) {
            console.log(error);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
