const { forwardAuth, restrictUnauth } = require("../Middlewares/requireAuth");


module.exports = (app) => {
    //---handlebars view routes---

    //landing page
    app.get("/", (req, res) => {
        res.render("main", { layout: "index" });
    });
    //signup page
    app.get("/SignUp", forwardAuth, (req, res) => {
        res.render("signUp", { layout: "index" });
    });
    //log in page
    app.get("/LogIn", forwardAuth, (req, res) => {
        // console.log("" + req.flash('error_msg'));
        console.log(req.flash("error_msg"));
        console.log("res.locals: ");
        console.log(res.locals);
        res.render("logIn", { layout: "index" });

    });
    //dashboard
    app.get("/dashboard", restrictUnauth, (req, res) => {
        try
        {
            res.render("dashboard", { layout: "index" });
        } catch (error)
        {
            console.error(error);
        }
    });

    app.get("/team", restrictUnauth, (req, res) => {
        try
        {
            res.render("members", { layout: "index" });
        } catch (e)
        {
            console.error(error);
        }
    })

    app.get("/eventsPage", restrictUnauth, (req, res) => {
        try
        {
            res.render("events", { layout: "index" });
        } catch (e)
        {
            console.error(error);
        }
    })

}