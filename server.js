const express = require("express");
const authRoutes = require("./routes/authroutes");
const passportSetup = require("./config/passport");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));


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