const express = require("express");
const authRoutes = require("./routes/authroutes");
const passport = require("passport");
const passportSetup = require("./config/passport");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");

const app = express();

app.use(express.static("public"));

// Intialize our cookie with a max age of 24 hours and a session key that we created.
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
const databaseUri = "mongodb://localhost/passport-test";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
} else {
  mongoose.connect(databaseUri)
}


// Auth Routes
app.use("/auth", authRoutes);

// Home route
app.get("/", (req, res) => {
    res.render("index");
})


app.listen(3000, () => {
    console.log("listening on 3000");
})