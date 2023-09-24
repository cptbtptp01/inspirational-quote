const db = require('../models'); // database
const Quote = db.quote; // quote model
const Op = db.Sequelize.Op; // for using operators like [Op.like]

exports.findAuthors = async (author) => {
  let query = {};
  let where = {};

  if (author) {
    where = {
      author: { [Op.substring]: author.toLowerCase() },
    };
  }

  query = {
    attributes: ['author'],
    where,
    group: db.sequelize.fn('LOWER', db.sequelize.col('author')),
    order: db.sequelize.col('author'),
  };

  return new Promise((resolve, reject) => {
    Quote.findAll(query)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

exports.findRandomQuote = async () => {
  return new Promise((resolve, reject) => {
    Quote.findOne({ order: db.sequelize.random() })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

exports.findRandomAuthor = async () => {
  return new Promise((resolve, reject) => {
    Quote.findOne({ attributes: ['author'], order: db.sequelize.random() })
      .then((data) => resolve(data.author))
      .catch((err) => reject(err));
  });
};

exports.find = async (str, author) => {
  let query = {};
  const where = (col, s) => {
    return db.sequelize.where(
      db.sequelize.fn('INSTR', db.sequelize.fn('LOWER', db.sequelize.col(col)), s.toLowerCase()),
      { [Op.gt]: 0 },
    );
  };

  if (author) {
    if (str) {
      query = { where: { [Op.and]: [where('quote', str), where('author', author)] } };
    } else {
      query = { where: { author } };
    }
  } else if (str) {
    query = {
      where: { [Op.or]: [where('quote', str), where('author', str)] },
    };
  }
  query.order = db.sequelize.col('author');

  return new Promise((resolve, reject) => {
    Quote.findAll(query)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
