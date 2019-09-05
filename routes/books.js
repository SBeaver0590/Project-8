var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

// GET books listed
router.get('/', function(req, res, next) {
    Book.findAll({order: [["createdAt", "DESC"]]}).then(function(books){
        res.render("/books/index", {books: books});
    }).catch(function(error){
        res.send(500, error)
    });
});

// POST create book
router.post('/', function(req, res, next) {
    Book.create(req.body).then(function(book) {
        res.redirect("/books/" + book.id);
    }).catch(function(error) {
        if(error.name === "SequelizeValidationError") {
            res.render("books/new", {book: book.build(req.body), errors: error.errors, title: "New Book"})
        }else{
            throw error;
        }
    }).catch(function(error) {
        res.send(500, error);
    });
});

//CREATE New Book Form
router.get('/new', function(req, res, next) {
    res.render("books/new", {book: {}, title: "New Book"});
});

// EDIT Book Form
router.get("/:id/edit", function(req, res, next){
    Book.findById(req.params.id).then(function(book){
      if(book) {
        res.render("books/edit", {book: book, title: "Edit Book"});      
      } else {
        res.send(404);
      }
    }).catch(function(error){
        res.send(500, error);
     });
  });

  //DELETE Book Form
  router.get("/:id/delete", function(req, res, next){
    Book.findById(req.params.id).then(function(book){  
      if(book) {
        res.render("books/delete", {book: book, title: "Delete Book"});
      } else {
        res.send(404);
      }
    }).catch(function(error){
        res.send(500, error);
     });
  });

  // GET SINGLE Book
  router.get("/:id", function(req, res, next){
    Book.findById(req.params.id).then(function(book){
      if(book) {
        res.render("books/show", {book: book, title: book.title});  
      } else {
        res.send(404);
      }
    }).catch(function(error){
        res.send(500, error);
     });
  });

  // PUT Updated Book
  router.put("/:id", function(req, res, next){
    Book.findById(req.params.id).then(function(book){
      if(book) {
        return book.update(req.body);
      } else {
        res.send(404);
      }
    }).then(function(book){
      res.redirect("/books/" + book.id);        
    }).catch(function(error){
        if(error.name === "SequelizeValidationError") {
          var book = Book.build(req.body);
          book.id = req.params.id;
          res.render("books/edit", {book: book, errors: error.errors, title: "Edit Book"})
        } else {
          throw error;
        }
    }).catch(function(error){
        res.send(500, error);
     });
  });
  
  // DELETE Single Book
  router.delete("/:id", function(req, res, next){
    Book.findById(req.params.id).then(function(book){  
      if(book) {
        return book.destroy();
      } else {
        res.send(404);
      }
    }).then(function(){
      res.redirect("/books");    
    }).catch(function(error){
        res.send(500, error);
     });
  });

  module.exports = router;