const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const Users = require('../models/').users;
const Presets = require('../models/').presets;
const Hotkeys = require('../models/').hotkeys;
const { SALT_ROUNDS } = require('../config/constants');

const router = new Router();
router.post('/newPreset', authMiddleware, async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.user;
        if (!name || !id)
            return res.status(400).send({
                message: 'Inappriopriate action',
            });
        const newPreset = await Presets.create({
            name,
            userId: id,
        });
        console.log(newPreset.id);
        const newHotkeys = await Hotkeys.bulkCreate([
            {
                type: 'drum',
                keysString: 'QWER',
                presetId: newPreset.id,
            },
            {
                type: 'piano',
                keysString: 'Z-X-CV-B-N-MA-S-DF-G-H-JK-Q-WE-R-T-YU',
                presetId: newPreset.id,
            },
        ]);
        return res.status(200).send({
            message: 'Succesfully created new preset',
            newPreset,
            newHotkeys,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Something went wrong!' });
    }
});

module.exports = router;
