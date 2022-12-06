const Campground = require("../models/campground");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// Campground

module.exports.index = async (req, res) => {
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from db
        Campground.find({$or: [{title: regex,}, {location: regex}]}, function(err, allCampgrounds) {
            if(err || !allCampgrounds) {
                console.log(err);
                return req.flash("error", "Something Went Wrong");
            } else if (allCampgrounds.length < 1) {
                req.flash("error", "No Campgrounds found");
                return res.redirect("back");
            } else {
                delete req.session.getReturn;
                req.session.getReturn = req.originalUrl;
                res.render("yelpcamp/campgrounds/index", {campgrounds: allCampgrounds});
            }
        });

    } else {
        const campgrounds = await Campground.find({});
        res.render("yelpcamp/campgrounds/index", { campgrounds });
    }
}

// New Campground

module.exports.renderNewForm = (req, res) => {
    delete req.session.getReturn;
    req.session.getReturn = req.originalUrl;
    res.render("yelpcamp/campgrounds/new");
}
module.exports.createCampground = async(req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send();
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/yelpcamp/campgrounds/${campground._id}`);
}

// Show Campground

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    if(!campground) {
        req.flash("error", "Cannot find that campground");
        return res.redirect("/yelpcamp/campgrounds");
    }
    delete req.session.getReturn;
    req.session.getReturn = req.originalUrl;
    res.render("yelpcamp/campgrounds/show", { campground });
}

// Edit Campground

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if(!campground) {
        req.flash("error", "Cannot find that campground");
        return res.redirect("/yelpcamp/campgrounds");
    }
    delete req.session.getReturn;
    req.session.getReturn = req.originalUrl;
    res.render("yelpcamp/campgrounds/edit", { campground });
}
module.exports.editCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    campground.images.push(...imgs);
    await campground.save();
    if(req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    }
    req.flash("success", "Successfully updated campground!");
    res.redirect(`/yelpcamp/campgrounds/${campground._id}`);
}

// Delete Campground

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted campground");
    res.redirect("/yelpcamp/campgrounds");
}