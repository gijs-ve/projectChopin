const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const Recordings = require('../models/').recordings;
const RecordStrings = require('../models/').recordstrings;
const { v4 } = require('uuid');

const router = new Router();
router.post('/saveRecording', authMiddleware, async (req, res) => {
    try {
        const { strings, name } = req.body;
        const { id } = req.user;
        if (!strings || !id || !name)
            return res.status(400).send({
                message: 'Inappriopriate action',
            });
        const v4uuid = v4();
        const uuid = v4uuid.split('-')[0];
        const newRecording = await Recordings.create({
            name,
            userId: id,
            createdBy: req.user.name,
            uuid,
        });

        const bulkArray = strings.map((i) => {
            return { recordingId: newRecording.id, string: i };
        });
        await RecordStrings.bulkCreate(bulkArray);
        return res.status(200).send({
            message: 'Succesfully created new record',
        });
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: 'Something went wrong while saving!' });
    }
});
module.exports = router;
