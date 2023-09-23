module.exports = (sequelize, Sequelize) => {
  // schema
  const Quote = sequelize.define(
    'quote',
    {
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quote: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return Quote;
};
