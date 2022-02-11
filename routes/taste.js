var express     = require("express"),
    router      = express.Router(),
    TasteImage       = require("../models/tasteImages")

router.get("/", (req, res) => {
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from db
        TasteImage.find({category: regex}, (err, foundImages) => {
            if(err || !foundImages) {
                console.log(err)
                return res.redirect("back")
            } else if (foundImages.length < 1) {
                console.log("No Images Found")
                return res.redirect("back");
            } else {
                res.render("taste", {images: foundImages})
            }
        })
    }
    else {
        TasteImage.find({}, (err, foundImages) => {
            if(err) {
                console.log(err)
            } else {
                res.render("taste", {images: foundImages})
            }
        })
    }
})

// Search security/cleaning
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router

