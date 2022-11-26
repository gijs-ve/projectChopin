const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const Users = require('../models/').users;
const Presets = require('../models/').presets;
const Hotkeys = require('../models/').hotkeys;

const router = new Router();
router.post('/newPreset', authMiddleware, async (req, res) => {
    try {
        const { id } = req.user;
        if (!id)
            return res.status(400).send({
                message: 'Inappriopriate action',
            });
        const newPreset = await Presets.create({
            name: `${req.user.name}'s preset`,
            userId: id,
        });
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

router.patch('/editPreset', authMiddleware, async (req, res) => {
    try {
        const { id, pianoString, drumString } = req.body;
        const foundPreset = await Presets.findOne({
            where: { id },
            include: [{ model: Hotkeys }],
        });
        if (req.user.id !== foundPreset.userId)
            return res
                .status(403)
                .send({ message: 'You have no access to edit this preset.' });
        const updateHotkeysByInstrument = async (
            instrumentType,
            keysString,
        ) => {
            const instrument = foundPreset.hotkeys.find((i) => {
                if (i.type === instrumentType) return true;
            });
            const instrumentHotkey = await Hotkeys.findOne({
                where: { id: instrument.id },
            });
            instrumentHotkey.update({ keysString });
        };
        updateHotkeysByInstrument('drum', drumString);
        updateHotkeysByInstrument('piano', pianoString);
        return res
            .status(400)
            .send({ message: 'Preset was succesfully updated!' });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Something went wrong!' });
    }
});

module.exports = router;
