var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

const Book = require("../models").Book;
// const sqlite = require('sqlite');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// GET books listed show in descending order
router.get('/', function (request, response, next) {
  let pg = request.query.page;

  if (!pg)
      pg = 1;

  Book.findAll({
      order: [["createdAt", "DESC"]]
  }).then(function (totalBks) {
      Book.findAll({
          order: [["createdAt", "DESC"]],
          offset: (pg * 15) - 15,
          limit: 15
      }).then(function (books) {
          const totalPgs = Math.ceil(totalBks.length / 15);
          response.render("index", { title: "Books", books: books, totalPgs: totalPgs });
      }).catch(function (err) {
          console.log(err);
          response.sendStatus(500);
      });
  });
});


// POST create book
router.post('/new', function(req, res, next) {
    Book.create(req.body).then(function(book) {
        res.redirect("/books/" + book.id);
    }).catch(function(error) {
        if(error.name === "SequelizeValidationError") {
            res.render("new-book", {book: Book.build(req.body), errors: error.errors, title: "New Book"})
        }else{
            throw error;
        }
    }).catch(function(error) {
        res.send(500, error);
    });
});

//POST New Book Form
router.get('/new', function(req, res, next) {
    res.render("new-book", { title: "New Book", book: Book.build()});
});

// EDIT Book Form
router.get("/:id/edit", function(req, res, next){
    Book.findByPk(req.params.id).then(function(book){
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
  // router.get("/:id/delete", function(req, res, next){
  //   Book.findByPk(req.params.id).then(function(book){  
  //     if(book) {
  //       res.render("/books", {book: book, title: "Delete Book"});
  //     } else {
  //       res.send(404);
  //     }
  //   }).catch(function(error){
  //       res.send(500, error);
  //    });
  // });

  // GET SINGLE Book
  router.get("/:id", function(req, res, next){
    Book.findByPk(req.params.id).then(function(book){
      if(book) {
        res.render("update-book", {book: book, title: book.title});  
      } else {
        res.send(404);
      }
    }).catch(function(error){
        res.send(500, error);
     });
  });

  // PUT Updated Book
  router.post("/:id", function(req, res, next){
    Book.findByPk(req.params.id).then(function(book){
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
          res.render("update-book", {book: book, errors: error.errors, title: "Edit Book"})
        } else {
          throw error;
        }
    }).catch(function(error){
        res.send(500, error);
     });
  });
  
  // DELETE Single Book
  router.post("/:id/delete", function(req, res, next){
    Book.findByPk(req.params.id).then(function(book){  
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