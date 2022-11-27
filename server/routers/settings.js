const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const Settings = require('../models/').settings;
const router = new Router();

router.patch('/edit', authMiddleware, async (req, res) => {
    try {
        const { user } = req;
        const { settings } = req.body;
        const foundRecord = await Settings.findOne({
            where: { userId: user.id },
        });
        if (req.user.id !== foundRecord.userId)
            return res.status(403).send({
                message: 'You have no access to edit these settings.',
            });
        foundRecord.update({ name });
        return res
            .status(200)
            .send({ message: 'Record was succesfully renamed!' });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Something went wrong!' });
    }
});

module.exports = router;
