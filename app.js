var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var routes = require('./routes/index');
var books = require('./routes/books');

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);

// catch 404 and send to error handler
app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
if (app.get('env') === 'development') { //error on the development end
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) { //production error handler
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

// app.get('/', function (req, res) {
//     res.send('GET request to the homepage')
//   })

// app.post('/', function (req, res) {
//     res.send('POST request to the homepage')
// })

// // app.length('/', function(req,res){
// //     res.send('Hello, Simone')
// // })

// app.get('/about', function (req, res) {
//     res.send('about')
// })


// app.get('/books', function (req, res) {
//     res.send(req.params)
// })

// app.post('/books/:id', function (req, res) {
//     res.send('POST request to the homepage')
// })

// app.get('/books/:id', function (req, res) {
//     res.send(req.params)
// })

// app.route('/book')
//   .get(function (req, res) {
//     res.send('Get a random book')
//   })
//   .post(function (req, res) {
//     res.send('Add a book')
//   })
//   .put(function (req, res) {
//     res.send('Update the book')
//   })