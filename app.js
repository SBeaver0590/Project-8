var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('GET request to the homepage')
  })

app.post('/', function (req, res) {
    res.send('POST request to the homepage')
})

// app.length('/', function(req,res){
//     res.send('Hello, Simone')
// })

app.get('/about', function (req, res) {
    res.send('about')
})


app.get('/books', function (req, res) {
    res.send(req.params)
})

app.post('/books/:id', function (req, res) {
    res.send('POST request to the homepage')
})

app.get('/books/:id', function (req, res) {
    res.send(req.params)
})