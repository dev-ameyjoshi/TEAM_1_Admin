const express = require("express");
const handlebars = require("express-handlebars");
const authRoutes = require("./Routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;


//handlebars stuff
app.set('view engine', "hbs");
app.engine("hbs", handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/partials/'
}))
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("main", {layout: "index"});
});

app.get("/signUp", (req, res) => {
    res.render("signUp", {layout: "index"});
});
app.use("/auth", authRoutes);



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});