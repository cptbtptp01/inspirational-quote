const createError = require('http-errors');
const quoteService = require('../service/quoteService');

const wrap =
  (fn) =>
  (...args) =>
    fn(...args).catch(args[2]); // wrap async functions in express routes

exports.getAuthors = wrap(async (req, res, next) => {
  try {
    let author = req.query.q;
    if (author && author.length < 3) {
      author = undefined;
    }
    const authors = await quoteService.findAuthors(author);
    res.send(authors);
  } catch (err) {
    next(createError(500, err));
  }
});

exports.getRandomQuote = wrap(async (req, res, next) => {
  const quote = await quoteService.findRandomQuote();
  res.send(quote);
});

exports.getRandomAuthor = wrap(async (req, res, next) => {
  const author = await quoteService.findRandomAuthor();
  const quotes = await quoteService.find(author);
  res.send(quotes);
});

exports.searchQuotes = wrap(async (req, res, next) => {
  let query = req.query.q;
  let author = req.query.author;

  if (query && query.length < 3) {
    query = undefined;
  }

  if (author && author.length < 3) {
    author = undefined;
  }

  let quotes = [];
  if (query || author) {
    quotes = await quoteService.find(query, author);
  }
  res.send(quotes);
});
