const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const PORT = process.env.PORT || 8088;
require("dotenv").config();
// Routes
const authenticationRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");

const uri = process.env.ATLAS_URI;

// Connecting to MongoDB

mongoose.connect(uri, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to MongoDB");
})
    .catch(err => console.log(err.reason));

mongoose.Promise = global.Promise;

// App use

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors (probably will need to adjust it later)

app.use(cors());

// Routes
// Passport / Authentication
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authenticationRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))