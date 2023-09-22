const db = require("../models"); // database
const Quote = db.quote; // quote model
const Op = db.Sequelize.Op; // for using operators like [Op.like]

exports.getAuthors = async () => {
    // TODO: implement, list all authors, TBD if we need this
};

exports.getQuotesByAuthor = async (author) => {
    // TODO: implement
};

exports.getRandomQuote = async () => {
    // TODO: implement
};

exports.getQuotesByKeyword = async (keyword) => {
    // TODO: implement
};

exports.findById = async (id) => {
    // TODO: implement
};