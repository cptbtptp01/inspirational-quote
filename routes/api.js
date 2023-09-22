let express = require("express");
let router = express.Router();
const quoteController = require("../controllers/quoteController");

// quotes routes
router.get("/authors", quoteController.getAuthors); // list all authors
router.get("/authors/:author", quoteController.getQuotesByAuthor); // list all quotes by author
router.get("/quotes/random", quoteController.getRandomQuote); // get a random quote
router.get("/quotes/keyword/:keyword", quoteController.getQuotesByKeyword); // get quotes by keyword
router.get("/quotes/:id", quoteController.getQuoteById); // get a quote by id

module.exports = router;
