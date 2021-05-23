const router = require('express').Router();
const db = require('../db')
const Game = db.Game

router.get('/all', async(req, res) => {
    try {
        const data = await Game.findAll({ where: { owner_id: req.user.id } })
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
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.get('/:id', async(req, res) => {
    try {
        const game = await Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } })
        if (game === null) {
            res.status(500).json({ //fix
                message: 'Not found!'
            })
        } else {
            res.status(200).json({
                game: game
        })
    }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.post('/create', async(req, res) => {
    try {
        const { title, studio, esrb_rating, user_rating, have_played} = req.body.game; //refactor
        const game = await Game.create({
            title: title,
            owner_id: req.user.id, //fix
            studio: studio,
            esrb_rating: esrb_rating,
            user_rating: user_rating,
            have_played: have_played
        })
        if (game === null) {
            res.status(500).json({ 
                message: 'Error! Game cannot be null'
            })
        } else {
            res.status(200).json({
                game: game,
                message: "Game created."
            })
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.put('/update/:id', async(req, res) => {
    try {
        const { title, studio, esrb_rating, user_rating, have_played} = req.body.game; //refactor
        const game = await Game.update({
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
    } catch (err) {
        res.status(500).json({  
            message: err.message
        })
        }
})

router.delete('/remove/:id', async(req, res) => {
    try {
        const game = await Game.destroy({
            where: {
                id: req.params.id,
                owner_id: req.user.id
            }
        })
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
    } catch (err) {
            res.status(500).json({
                error: err.message
            })
    }
})

module.exports = router; //router exports