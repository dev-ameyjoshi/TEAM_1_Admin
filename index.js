const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const handlebars = require("express-handlebars");
require("./Models/User");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const requireAuth = require("./Middlewares/requireAuth");
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;

//handlebars stuff
app.set('view engine', "hbs");
app.engine("hbs", handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'planB',
    partialsDir:path.join(__dirname, '/views/partials')
}))
// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '/public')))
// app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

mongoose.connect(keys.MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to mongo")
}).catch(e => {
    console.error(e);
})

// app.use("/auth", authRoutes);
require("./Routes/authRoutes")(app);


//---handlebars view routes---

//landing page
app.get("/", (req, res) => {
    res.render("main", {layout: "index"});
});
//signup page
app.get("/SignUp", (req, res) => {
    res.render("signUp", {layout: "index"});
});
//log in page
app.get("/LogIn", (req, res) => {
    res.render("logIn", {layout: "index", errorsExist: false});
});
//dashboard
app.get("/dashboard", (req, res) => {
    // console.log(req.userId);
    try {
        res.render("dashboard", {layout: "index"});
    } catch (error) {
        console.error(error);
    }
});



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});