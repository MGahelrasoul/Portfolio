var express = require("express"),
    router = express.Router(),
    GalleryImage = require("../models/galleryImages")

router.get("/", (req, res) => {
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from db
        GalleryImage.find({ category: regex }, (err, foundImages) => {
            if (err || !foundImages) {
                console.log(err)
                return res.redirect("back")
            } else if (foundImages.length < 1) {
                console.log("No Images Found")
                return res.redirect("back");
            } else {
                res.render("gallery", { images: foundImages })
            }
        })
    }
    else {
        GalleryImage.find({}, (err, foundImages) => {
            if (err) {
                console.log(err)
            } else {
                res.render("gallery", { images: foundImages })
            }
        })
    }
})

// Search security/cleaning
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router