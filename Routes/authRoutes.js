const express = require("express");
const router = express.Router();
const {signUp} = require("../Controllers/auth");

router.post("/signUp", signUp);

module.exports = router;