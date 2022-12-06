require('dotenv').config()

const express = require('express'),
    path = require("path"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    engine = require("ejs-mate"),
    session = require("express-session"),
    flash = require("connect-flash"),
    ExpressError = require("./utils/ExpressError"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    helmet = require("helmet"),
    mongoSanitize = require("express-mongo-sanitize"),

    Campground  = require("./models/campground"),
    Review     = require("./models/review"),
    User        = require("./models/user"),

    indexRoutes = require("./routes/index"),
    ycReviewRoutes = require("./routes/yelpcamp/reviews"),
    ycCampgroundRoutes = require("./routes/yelpcamp/campgrounds"),
    ycUserRoutes = require("./routes/yelpcamp/users"),

    MongoDBStore = require("connect-mongo")

const dbUrl = "mongodb://localhost/Portfolio"; //process.env.DB_URL;

    // Connect to MongoDB via mongoose
 
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// mongoose.set('strictQuery', false);

// Catch error
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

    // Setup express app

const app = express();

app.engine("ejs", engine);
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(mongoSanitize());

    // Session Store

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    secret: "thisshouldbeabettersecret",
    touchAfter: 24 * 3600,
});
store.on("error", function(e) {
    console.log("SESSION STORE ERROR");
});

// Session config
const sessionConfig = {
    store,
    name: "session",
    secret: "Apple bottom Jeans",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig));
app.use(flash());

    // Helmet security
    
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://code.jquery.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [
    "https://fonts.gstatic.com/",
];
app.use(
    helmet.contentSecurityPolicy({
        // useDefaults: false,
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", "'unsafe-eval'", "http://www.google.com", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dubnbjlho/",
                "https://images.unsplash.com/",
                "https://i.ibb.co/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
            // upgradeInsecureRequests: [],
        },
    })
);

    // Passport configuration

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
app.use("/yelpcamp", ycUserRoutes);
app.use("/yelpcamp/campgrounds", ycCampgroundRoutes);
app.use("/yelpcamp/campgrounds/:id/reviews", ycReviewRoutes);

// Reroute all other addresses to appropriate landing page
app.all("*", (req, res, next) => {
    if(!req.originalUrl.includes("/yelpcamp/")){
        next(new ExpressError("Page Not Found", 404));
    } else {
        const redirectUrl = req.session.getReturn || "/yelpcamp/campgrounds";
        delete req.session.getReturn;
    
        req.flash("error", "Oh No, Something Went Wrong!");
        return res.redirect(redirectUrl);
    }
})
app.use((err, req, res, next) => {
    const redirectUrl = req.session.getReturn || "/yelpcamp/campgrounds";
    delete req.session.getReturn;
    
    const { statusCode = 500 } = err;
    if(!err.message) err.message = "Oh No, Something Went Wrong!";

    req.flash("error", err.message);
    return res.status(statusCode).redirect(redirectUrl);
    // res.status(statusCode).render("yelpcamp/error", { err });

})

app.listen(3000, () => {
    console.log('SERVER STARTED')
})

