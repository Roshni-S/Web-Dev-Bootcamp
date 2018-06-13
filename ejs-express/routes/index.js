var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));

router.use(express.static("public"));
//router.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home');
});

router.post("/addfriend", function(req, res){
  var newFriend = req.body.newfriend;
  friends.push(newFriend);
  res.redirect("/friends");
});

router.get("/friends", function (req, res) {
  res.render("friends", { friends: friends });
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/fallinlovewith/:thing', function(req, res, next) {
  res.render('love', { thingVar: req.params.thing });
});

router.get("/posts", function(req, res){
  var posts = [
    { title: "Post1", author: "Susy"},
    { title: "My adorable pet bunny", author: "Charlie" },
    { title: "Can you believe this pomsky", author: "Colt" }
  ];

  res.render("posts.ejs", {posts: posts});
});


module.exports = router;

