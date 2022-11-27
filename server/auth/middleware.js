const Users = require('../models').users;
const Presets = require('../models').presets;
const Hotkeys = require('../models').hotkeys;
const Recordings = require('../models').recordings;
const RecordStrings = require('../models').recordstrings;
const SharedRecordings = require('../models').sharedrecordings;
const Settings = require('../models').settings;
const { toData } = require('./jwt');

async function auth(req, res, next) {
    const auth =
        req.headers.authorization && req.headers.authorization.split(' ');

    if (!auth || !(auth[0] === 'Bearer') || !auth[1]) {
        return res.status(401).send({
            message:
                'This endpoint requires an Authorization header with a valid token',
        });
    }

    try {
        const data = toData(auth[1]);
        const user = await Users.findByPk(data.userId, {
            include: [
                { model: Presets, include: [{ model: Hotkeys }] },
                { model: Recordings, include: [{ model: RecordStrings }] },
                { model: Settings, as: 'userSettings' },
                {
                    model: SharedRecordings,
                    include: [
                        {
                            model: Recordings,
                            include: [{ model: RecordStrings }],
                        },
                    ],
                },
            ],
        });
        if (!user) {
            return res.status(404).send({ message: 'User does not exist' });
        }
        req.user = user;
        return next();
    } catch (error) {
        console.log('ERROR IN AUTH MIDDLEWARE', error);

        switch (error.name) {
            case 'TokenExpiredError':
                return res
                    .status(401)
                    .send({ error: error.name, message: error.message });

            case 'JsonWebTokenError':
                return res
                    .status(400)
                    .send({ error: error.name, message: error.message });

            default:
                return res.status(400).send({
                    message: 'Something went wrong, sorry',
                });
        }
    }
}

module.exports = auth;
