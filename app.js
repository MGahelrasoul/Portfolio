require('dotenv').config()

const express = require('express'),
    app = express(),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    GalleryImage = require("./models/galleryImages"),
    TasteImage = require("./models/tasteImages"),
    Blog = require("./models/blogs"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    galleryRoutes = require("./routes/gallery"),
    tasteRoutes = require("./routes/taste"),
    indexRoutes = require("./routes/index"),
    techblogRoutes = require("./routes/techblog"),
    ycCommentRoutes = require("./routes/yelpcamp/comments"),
    ycCampgroundRoutes = require("./routes/yelpcamp/campgrounds"),
    ycIndexRoutes = require("./routes/yelpcamp/index")

// Connect to MongoDB
mongoose.connect("mongodb://localhost/Portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("CONNETED TO DB"))
.catch((error) => console.log(error.message))

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// Passport configuration
app.use(require("express-session")({
    secret: "Apple bottom Jeans",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to pass current user for all routes
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

// Requiring Routes
app.use("/", indexRoutes);
app.use("/gallery", galleryRoutes);
app.use("/taste", tasteRoutes);
app.use("/techblog", techblogRoutes);
app.use("/yelpcamp", ycIndexRoutes);
app.use("/yelpcamp/campgrounds", ycCampgroundRoutes);
app.use("/yelpcamp/campgrounds/:id/comments", ycCommentRoutes);

// Reroute all other addresses to landing page
app.get("/*", (req, res) => {
    res.status(404).redirect('/error')
})

app.listen(3000, () => {
    console.log('SERVER STARTED')
})

