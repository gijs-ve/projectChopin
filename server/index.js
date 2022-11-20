const express = require('express');
const corsMiddleWare = require('cors');
const authRouter = require('./routers/auth');
const { PORT } = require('./config/constants');
const app = express();

app.use(corsMiddleWare());
app.use(express.json());
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
