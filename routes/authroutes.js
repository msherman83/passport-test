const router = require("express").Router();
const passport = require("passport");


// Auth login
router.get("/", (req, res) => {
    res.render("index");
});

// Auth logout
router.get("/logout", (req, res) => {
    res.send("logging out");
})

// Auth with google and what we want from them.
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

// Callback Redirect Handler to exchage google code for Google profile details
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.send("You reached the CB URI");
});

module.exports = router;