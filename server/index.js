const corsMiddleWare = require('cors');

//Server setup
const express = require('express');
const app = express();
const { PORT } = require('./config/constants');

//Socket setup
const io = require('socket.io')(4001, {
    cors: {
        origin: ['http://localhost:3000'],
    },
});

//Routers
const authRouter = require('./routers/auth');

app.use(corsMiddleWare());
app.use(express.json());
app.use('/auth', authRouter);

io.on('connection', (socket) => {});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
