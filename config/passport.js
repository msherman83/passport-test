const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/usermodel")

// Using a Google Stategy bring to Google+ API Credentials as well as the callback URL.
passport.use(
    new GoogleStrategy({
        // Callback URL to redirect to google for auth
        callbackURL: "/auth/google/redirect",
        // Google API Credentials
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // Log profile to console
        console.log(profile);

        // If user exists don't create new user.
        User.findOne({
            googleID: profile.id
        }).then((currentUser) => {

            if (currentUser) {
                
                // User already exists.
                console.log("User exists" + currentUser);
            } else {

                // Create a new user.
                new User({
                    username: profile.displayName,
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log("New User Created: " + newUser);
                })
            }
        });

    })
);