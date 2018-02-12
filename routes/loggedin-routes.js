const router = require("express").Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        // If user is not logged in
        res.sendfile("./public/index.html")
    } else {
        next();
    }
};

// Default route after logging in through Google.
router.get("/", authCheck, (req, res) => {
    res.sendfile("./public/home.html", { user: req.user } );
});

module.exports = router;