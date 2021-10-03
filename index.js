const express = require("express");
const path = require('path');
const handlebars = require("express-handlebars");
const passport = require('passport');
const session = require('express-session');
const mongoose = require("mongoose");
const flash = require('connect-flash');

require("./Models/User");
require("./Models/Event");
require("./Models/Member");
require('./services/passport')(passport);
const keys = require("./config/keys");

const app = express();
const PORT = process.env.PORT || 5000;
mongoose.Promise = global.Promise;

mongoose.connect(keys.MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to mongo")
}).catch(e => {
    console.error(e);
})

app.set('view engine', "hbs");
app.engine("hbs", handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'planB',
    partialsDir: path.join(__dirname, '/views/partials')
}))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//session middleware
app.use(session({
    secret: "sehfdkfniufheifk;jsh",
    resave: false,
    saveUninitialized: false
}));


//passport middlware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/public/assets')))
//connecting route handlers
require("./Routes/authRoutes")(app);
require("./Routes/eventRoutes")(app);
require("./Routes/memberRoutes")(app);

//---handlebars view routes---

//landing page
app.get("/", (req, res) => {
    res.render("main", { layout: "index" });
});
//signup page
app.get("/SignUp", (req, res) => {
    res.render("signUp", { layout: "index" });
});

app.get("/Team", (req, res) => {
    res.render("team", { layout: "index" });
});

app.get("/Adduser", (req, res) => {
    res.render("adduser", { layout: "index" });
});

app.get("/Events", (req, res) => {
    res.render("events", { layout: "index" });
});
// log in page
app.get("/LogIn", (req, res) => {
    res.render("logIn", { layout: "index" });
});





//dashboard
app.get("/dashboard", (req, res) => {
    // console.log(req.userId);
    try
    {
        res.render("dashboard", { layout: "index" });
    } catch (error)
    {
        console.error(error);
    }
});

app.get("/team", (req, res) => {
    try
    {
        res.render("members", { layout: "index" });
    } catch (e)
    {
        console.error(error);
    }
})

app.get("/eventsPage", (req, res) => {
    try
    {
        res.render("events", { layout: "index" });
    } catch (e)
    {
        console.error(error);
    }
})




app.listen(PORT, () => {
    console.log(`🚀listening on port ${PORT}`);
});