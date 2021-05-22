const router = require('express').Router();
const db = require('../db')
const Game = db.Game

router.get('/all', (req, res) => {
    Game.findAll({ where: { owner_id: req.user.id } })
        .then(
            function findSuccess(data) {
                if (data.length === 0) {
                    res.status(500).json({
                        message: "No games right now"
                    })
                } else {
                    res.status(200).json({
                        games: data, //fix
                        message: "Data fetched."
                    })
                }
            },

            function findFail(err) {
                res.status(500).json({
                    message: err.message
                })
            }
        )
})

router.get('/:id', (req, res) => {
    Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } })
        .then(
            function findSuccess(game) {
                if (game === null) {
                    res.status(500).json({ //fix
                        message: 'Not found!'
                    })
                } else {
                    res.status(200).json({
                        game: game
                    })
                }
            },

            function findFail(err) { //need to fix
                res.status(500).json({
                    message: err.message
                })
            }
        )
})

router.post('/create', (req, res) => {
    const { title, studio, esrb_rating, user_rating, have_played} = req.body.game; //refactor
    Game.create({
        title: title,
        owner_id: req.user.id, //fix
        studio: studio,
        esrb_rating: esrb_rating,
        user_rating: user_rating,
        have_played: have_played
    })
        .then(
            function createSuccess(game) {
                res.status(200).json({
                    game: game,
                    message: "Game created."
                })
            },

            function createFail(err) {
                res.status(500).send(err.message)
            }
        )
})

router.put('/update/:id', (req, res) => {
    const { title, studio, esrb_rating, user_rating, have_played} = req.body.game; //refactor
    Game.update({
        title: title,
        studio: studio,
        esrb_rating: esrb_rating,
        user_rating: user_rating,
        have_played: have_played
    },
        {
            where: {
                id: req.params.id,
                owner_id: req.user.id,
            }
        })
        .then(
            function updateSuccess(game) {
                if (game[0] === 0) {
                    res.status(500).json({ //fix
                        message: 'Not found!'
                    })
                } else {
                    res.status(200).json({
                        game: game,
                    message: "Successfully updated."
                    })
                }
            },

            function updateFail(err) { //fix
                res.status(500).json({
                    message: err.message
                })
            }

        )
})

router.delete('/remove/:id', (req, res) => {
    Game.destroy({
        where: {
            id: req.params.id,
            owner_id: req.user.id
        }
    })
    .then(
        function deleteSuccess(game) {
            if (game === 0) {
                res.status(500).json({
                    message: "not found"
                })
            } else {
                res.status(200).json({
                    game: game,
                    message: "Successfully deleted"
                })
        }
        },

        function deleteFail(err) {
            res.status(500).json({
                error: err.message
            })
        }
    )
})

module.exports = router; //router exports