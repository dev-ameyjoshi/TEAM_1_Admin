const express = require("express");
const router = express.Router();
const {signUp, logIn, getProfiles} = require("../Controllers/auth");


// router.use(express.static('../public'));

// router.post("/signUp", signUp);
// router.post("/logIn", logIn);
// router.get("/allUsers", getProfiles);
// router.get("/dashboardtwo", (req, res) => {
//     res.render("dashboard", {layout: "index"});
// })
// router.get("/logintwo", (req, res) => {
//     res.render("logIn", {layout: "index", errorsExist: false});
// })

// module.exports = router;
module.exports = (app) => {
    app.post("/auth/signUp", signUp);
    app.post("/auth/logIn", logIn);
    app.get("/auth/allUsers", getProfiles);
}