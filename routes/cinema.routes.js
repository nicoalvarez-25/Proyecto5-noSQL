const express = require('express');
const Cinema = require('../models/Cinema');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const cinemas = await Cinema.find().populate('movies');
        return res.status(200).json(cinemas);
    } catch (error) {
        return next(error);
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const newCinema = new Cinema({
            name: req.body.name,
            location: req.body.location,
            movies: req.body.movies || []
        });
        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;