const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

/**
 * @swagger
 * /authors:
 *  get:
 *  summary: List all authors
 *  description: Returns a list of all authors
 *  responses:
 *      200:
 *          description: Successful response
 *      500:
 *      description: Server error
 */
router.get('/authors', quoteController.getAuthors);

/**
 * @swagger
 * /quotes/random-author:
 *  get:
 *  summary: Get a random author's quotes
 *  description: Returns a random author's quotes
 *  responses:
 *      200:
 *          description: Successful response
 *      500:
 *          description: Server error 
 */
router.get('/quotes/random-author', quoteController.getRandomAuthor); // get a random author's quotes

/**
 * @swagger
 * /quotes/random:
 *  get:
 *  summary: Get a random quote
 *  description: Returns a random quotes
 *  responses:
 *      200:
 *          description: Successful response
 *      500:
 *          description: Server error 
 */
router.get('/quotes/random', quoteController.getRandomQuote); // get a random quote

/**
 * @swagger
 * /quotes:
 *  get:
 *  summary: Get a quote by user input
 *  description: Returns quotes by user input or not found message if no quotes found
 *  responses:
 *      200:
 *          description: Successful response
 *      500:
 *          description: Server error 
 */
router.get('/quotes', quoteController.searchQuotes); // get quotes by keyword or author

module.exports = router;
