var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://res.cloudinary.com/simpleview/image/fetch/c_fill,f_auto,h_452,q_75,w_982/http://res.cloudinary.com/simpleview/image/upload/v1469218578/clients/lanecounty/constitution_grove_campground_by_natalie_inouye_417476ef-05c3-464d-99bd-032bb0ee0bd5.png",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "https://www.colorado.com/sites/default/files/Wupperman-Campground-near-Lake-City%2C-Colorado.-Photo-by-Mary-Carkin%2C-Lake-City-Switchbacks..jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFPtGKIyZgXdhLiOCaY7E-QdqS8z2qjtcB7othBZGlxLCHdV9wxw",
        description: "blah blah blah"
    }
]

function seedDb(){
    //Removes all Campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //Add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                               console.log(err); 
                            }
                            else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
    //Add some comments
}

module.exports = seedDb;

