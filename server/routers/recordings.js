const { Router } = require('express');
const authMiddleware = require('../auth/middleware');
const Recordings = require('../models/').recordings;

const router = new Router();
router.post('/saveRecording', authMiddleware, async (req, res) => {
    try {
        const { strings, name } = req.body;
        const { id } = req.user;
        return res.status(200).send({
            message: 'Succesfully created new preset',
            newPreset,
            newHotkeys,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ message: 'Something went wrong while saving!' });
    }
});
module.exports = router;
