const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

/**
 * @swagger
 * /api/authors:
 *   get:
 *     description: Get a list of authors
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.get('/authors', quoteController.getAuthors);

/**
 * @swagger
 * /api/quotes/random-author:
 *   get:
 *     description: Get a random author's quotes
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.get('/quotes/random-author', quoteController.getRandomAuthor); // get a random author's quotes

/**
 * @swagger
 * /api/quotes/random:
 *   get:
 *     description: Get a random quote
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.get('/quotes/random', quoteController.getRandomQuote); // get a random quote

/**
 * @swagger
 * /api/quotes:
 *   get:
 *     description: Get quotes by search input
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.get('/quotes', quoteController.searchQuotes); // get quotes by keyword or author

module.exports = router;
