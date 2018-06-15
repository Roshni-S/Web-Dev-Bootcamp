var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name: "Granite Hill",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWVu64x8L8o1gKor2DfVNvpe3dadFJ7Ye0Rmr9goA0rPRXsdHh",
        description: "This is a huge granite hill, no bathroom"
    }, function(err, campground){
        if(err){
            console.log(err);
        }
        else {
            console.log("Newly Created Campground")
            console.log(campground);
        }
    });

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else {
            res.render("campgrounds",{campgrounds:allCampgrounds});
        }
    });

    // Campground.remove({}, () => {
    //     res.end();
    // })
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    })
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(){
    res.send("THIS WILL BE THE SHOW PAGE ONE DAY");
});

app.listen(3000, function () {
    console.log("listening on http://localhost:3000");
});