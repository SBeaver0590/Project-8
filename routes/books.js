var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

// GET books listed
router.get('/', function(req, res, next) {
    Book.findAll({order: [["createdAt", "DESC"]]}).then(function(books){
        res.render("/books/index", {books: books});
    }).catch(function(error){
        res.send(500, error)
    })
})