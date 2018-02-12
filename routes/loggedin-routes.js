const router = require("express").Router();


// Default route after logging in through Google.
router.get("/", (req, res) => {
    res.send("This is you " + req.user.username);
});

module.exports = router;