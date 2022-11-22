const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const Users = require('../models/').users;
const Hotkeys = require('../models/').hotkeys;
const { SALT_ROUNDS } = require('../config/constants');

const router = new Router();
router.update('/changeName', authMiddleware, async (req, res) => {
    res.status(200).send({ ...req.user.dataValues });
});
module.exports = router;
