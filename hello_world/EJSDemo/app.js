// var express = require("express");
// var app = express();
// var ejs = require('ejs');

// app.set('view engine', 'ejs');

// app.get("/", function(req, res){
//     // res.render("home.ejs");
//     res.render('views/index');

// });

// app.listen(3000, function(){
//     console.log("Now serving your app!");
// });

// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function (req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function (req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');