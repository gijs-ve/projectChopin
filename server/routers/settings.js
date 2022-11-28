const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const Settings = require('../models/').settings;
const router = new Router();

router.patch('/edit', authMiddleware, async (req, res) => {
    try {
        const { user } = req;
        const { settings } = req.body;

        const foundSettings = await Settings.findOne({
            where: { userId: user.id },
        });
        if (req.user.id !== foundSettings.userId)
            return res.status(403).send({
                message: 'You have no access to edit these settings.',
            });
        const setting = settings.map((i) => {
            return [i.name.split(' ').join('').toLowerCase(), i.setting];
        });
        const userSettings = {};
        setting.forEach((i) => {
            const key = i[0];
            const value = i[1];
            userSettings[key] = value;
        });
        const {
            imageurl,
            hexcolor,
            enableinstrument,
            showpresets,
            showdisplayer,
            showrecorder,
        } = userSettings;
        console.log(hexcolor);
        await foundSettings.update({
            imageURL: imageurl,
            color: hexcolor,
            showInstrumentButtons: enableinstrument,
            showPresetButtons: showpresets,
            displayerOn: showdisplayer,
            recorderOn: showrecorder,
        });

        return res
            .status(200)
            .send({ message: 'Record was succesfully renamed!' });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Something went wrong!' });
    }
});

module.exports = router;
