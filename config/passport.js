const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/usermodel")


// Takes an identifying piece from user to put into a cookie.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Take googleID and find user based on googleID when cookie comes back.
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
});

// Using a Google Stategy bring to Google+ API Credentials as well as the callback URL.
passport.use(
    new GoogleStrategy({

        // Callback URL to redirect to google for auth
        callbackURL: "/auth/google/redirect",

        // Google API Credentials
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret

        // What we want back from Google.
    }, (accessToken, refreshToken, profile, done) => {
        // Log profile to console
        console.log(profile);

        // If user exists don't create new user.
        User.findOne({
            googleID: profile.id
        }).then((currentUser) => {

            // If signed in user exists
            if (currentUser) {

                // User already exists.
                console.log("User exists" + currentUser);

                // Take existing user and bring them up to serialize them above.
                done(null, currentUser);
            } else {

                // Otherwise create a new user.
                new User({
                    username: profile.displayName,
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log("New User Created: " + newUser);

                    // Take newly created user and bring them up to serialize them above.
                    done(null, newUser);
                })
            }
        });

    })
);