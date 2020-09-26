const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
require("../services/passport")(passport);

// Login with passport-local

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return err;
        if (!user) res.send("No User Found");
        else {
            req.logIn(user, (err) => {
                if (err) return err;
                res.send("Successfully Authenticated");
            })
        }
    })(req, res, next);
});

// Register with passport-local
// The password gets hashed by bcrypt

router.post("/register", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) return err;
        if (doc) res.send("User Already exists");
        if (!doc) {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword
            });
            await newUser.save();
            res.send("User created");
        }
    })
})

// Getting user info

router.get("/user/:username", async (req, res) => {
    if (req.params.username) {
        const user = await User.find({ username: req.params.username }).exec();
        if (user) {
            if (user.length !== 0) {
                res.status(200).send(user);
            }
            else {
                res.send("User not found");
            }
        }
        else {
            res.sendStatus(404);
        }
    }
    else {
        res.sendStatus(500);
    }
});
module.exports = router;