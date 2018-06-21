var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDb      = require("./seeds")

    mongoose.connect("mongodb://localhost/yelp_camp_v4");
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    seedDb();

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWVu64x8L8o1gKor2DfVNvpe3dadFJ7Ye0Rmr9goA0rPRXsdHh",
//         description: "This is a huge granite hill, no bathroom"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }
//         else {
//             console.log("Newly Created Campground")
//             console.log(campground);
//         
//     });

app.get("/", function(req, res){
    res.render("partials/landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else {
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });

    // Campground.remove({}, () => {
    //     res.end();
    // })
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description:desc}
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
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id)
              .populate("comments")
              .exec(function(err, foundCampground) {

        if(err){
            console.log('err', err);
        }
        else {
            console.log('found! ', foundCampground);
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
    // req.params.id
    // res.render("SHOW");
});


// ========================
// COMMENTS ROUTES
// ========================

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                }
                else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campground/" + campground._id);
                }
            });
        }
    });
});

app.listen(3000, function () {
    console.log("listening on http://localhost:3000");
});