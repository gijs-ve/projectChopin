const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const Settings = require('../models/').settings;
const router = new Router();
const isStringHexColor = require('../functions/getRandomImage');
const getRandomColor = require('../functions/getRandomColor');

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
        await foundSettings.update({
            imageURL: imageurl,
            color: isStringHexColor(hexcolor) ? hexcolor : getRandomColor(),
            showInstrumentButtons: enableinstrument,
            showPresetButtons: showpresets,
            displayerOn: showdisplayer,
            recorderOn: showrecorder,
        });
        return res
            .status(200)
            .send({ message: 'Your settings were succesfully updated!' });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Something went wrong!' });
    }
});

router.patch('/activePresets', authMiddleware, async (req, res) => {
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
        if (settings.length !== 9)
            return res.status(400).send({
                message: 'Invalid string!',
            });
        const settingString = settings.map((i) => i.preset).join('!');
        await foundSettings.update({
            activePresets: settingString,
        });
        return res
            .status(200)
            .send({ message: 'Your settings were succesfully updated!' });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Something went wrong!' });
    }
});

module.exports = router;
