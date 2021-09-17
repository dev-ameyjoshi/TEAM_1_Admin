const express = require("express");
const path = require('path');
const handlebars = require("express-handlebars");
require("./Models/User");
require("./Models/Event");
require("./Models/Member");
const mongoose = require("mongoose");
const cors = require('cors');
const keys = require("./config/keys");
const requireAuth = require("./Middlewares/requireAuth");
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;

//handlebars stuff
app.use(cors());
app.set('view engine', "hbs");
app.engine("hbs", handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'planB',
    partialsDir:path.join(__dirname, '/views/partials')
}))
// app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({extended: false}));
app.use(express.json());


mongoose.connect(keys.MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to mongo")
}).catch(e => {
    console.error(e);
})

//connecting route handlers
require("./Routes/authRoutes")(app);
require("./Routes/eventRoutes")(app);
require("./Routes/memberRoutes")(app);

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