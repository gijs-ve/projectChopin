const bcrypt = require('bcrypt');
const { Router } = require('express');
const { toJWT } = require('../auth/jwt');
const authMiddleware = require('../auth/middleware');
const Users = require('../models/').users;
const { SALT_ROUNDS } = require('../config/constants');

const router = new Router();

//login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .send({ message: 'Please provide both email and password' });
        }

        const user = await Users.findOne({ where: { email } });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({
                message: 'User with that email not found or password incorrect',
            });
        }

        delete user.dataValues['password']; // don't send back the password hash
        const token = toJWT({ userId: user.id });
        return res.status(200).send({ token, user: user.dataValues });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Something went wrong, sorry' });
    }
});

//signup
router.post('/signup', async (req, res) => {
    const { password, name } = req.body;
    if (!password || !name) {
        return res.status(400).send('Please provide a  password and a name');
    }

    try {
        const newUser = await Users.create({
            password: bcrypt.hashSync(password, SALT_ROUNDS),
            name,
        });

        delete newUser.dataValues['password']; // don't send back the password hash

        const token = toJWT({ userId: newUser.id });

        res.status(201).json({ token, user: newUser.dataValues });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).send({
                message: 'There is an existing account with this email',
            });
        }

        return res.status(400).send({ message: 'Something went wrong, sorry' });
    }
});

router.get('/self', authMiddleware, async (req, res) => {
    delete req.user.dataValues['password'];
    res.status(200).send({ ...req.user.dataValues });
});

module.exports = router;
