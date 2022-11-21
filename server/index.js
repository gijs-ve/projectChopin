const corsMiddleWare = require('cors');

//Server setup
const express = require('express');
const app = express();
const { PORT } = require('./config/constants');

//Socket setup
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

//Routers
const authRouter = require('./routers/auth');

app.use(corsMiddleWare());
app.use(express.json());
app.use('/auth', authRouter);

io.on('connection', (socket) => {
    console.log('a user connected');
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
