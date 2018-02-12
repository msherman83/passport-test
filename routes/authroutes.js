const router = require("express").Router();
const passport = require("passport");


// Auth login
router.get("/", (req, res) => {
    res.render("index");
});

// Auth with google and what we want from them.
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

// Callback Redirect Handler to exchage google code for Google profile details
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    // res.send(req.user);
    res.redirect("/home")
});

// Auth logout
router.get("/logout", (req, res) => {
    req.logout();
    res.sendfile("/");
})

module.exports = router;