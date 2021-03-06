const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const PORT = process.env.PORT || 8088;
const path = require("path");
require("dotenv").config();
// Routes
const routes = require("./routes/index");

const uri = process.env.ATLAS_URI;

// Connecting to MongoDB

mongoose.connect(uri, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to MongoDB");
})
    .catch(err => console.log(err.reason));

mongoose.Promise = global.Promise;

// Testing
app.get("/",(req,res)=>{
    res.send("Testing if works")
});
// App use

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors (probably will need to adjust it later)

app.use(cors({
    origin: "https://your-cocktail-cabinet.netlify.app",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json',
    // credentials: true,
}));

// Passport / Authentication
app.use(passport.initialize());
app.use(passport.session());
app.use("/api",routes);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`))