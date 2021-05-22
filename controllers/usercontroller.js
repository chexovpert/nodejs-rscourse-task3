const router = require('express').Router(); //router import
const bcrypt = require('bcryptjs'); //+js
const jwt = require('jsonwebtoken');

const db = require('../db');
const User = db.User; //fix

router.post('/signup', (req, res) => {
    const { full_name, username, password, email } = req.body.user; //refactor
    User.create({
        full_name: full_name,
        username: username,
        passwordHash: bcrypt.hashSync(password, 10), //fix
        email: email,
    })
        .then(
            function signupSuccess(user) {
                let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    user: user,
                    token: token
                })
            },

            function signupFail(err) {
                res.status(500).send({error: err.message})
            }
        )
})

router.post('/signin', (req, res) => {
    User.findOne({ where: { username: req.body.user.username } }).then(user => {
        if (user) {
            bcrypt.compare(req.body.user.password, user.passwordHash, function (err, matches) {
                if (matches) {
                    const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                    res.json({
                        user: user,
                        message: "Successfully authenticated.",
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({ error: "Passwords do not match." })
                }
            });
        } else {
            res.status(403).send({ error: "User not found." })
        }

    })
})

module.exports = router;