const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

// quotes routes
router.get('/authors', quoteController.getAuthors); // list all authors
router.get('/quotes/random', quoteController.getRandomQuote); // get a random quote
router.get('/quotes', quoteController.searchQuotes); // get quotes by keyword or author

module.exports = router;
