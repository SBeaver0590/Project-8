var book = require("../models").Book;

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Title is required"
        }
      }
    },
    author: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Author is required"
        }
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};