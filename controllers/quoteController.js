let createError = require("http-errors");
const quoteService = require("../services/quoteService");

let wrap =
  (fn) =>
  (...args) =>
    fn(...args).catch(args[2]); // wrap async functions in express routes

exports.getAuthors = wrap(async (req, res, next) => {
  // TODO: implement
});

exports.getQuotesByAuthor = wrap(async (req, res, next) => {
  // TODO: implement
});

exports.getRandomQuote = wrap(async (req, res, next) => {
  // TODO: implement
});

exports.getQuotesByKeyword = wrap(async (req, res, next) => {
  // TODO: implement
});

exports.getQuoteById = wrap(async (req, res, next) => {
  // TODO: implement
});
