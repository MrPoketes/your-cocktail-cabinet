const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Getting users cocktails

router.get("/:username", async (req, res) => {
    if (req.params.username) {
        const cocktails = await User.find({ username: req.params.username }, "cocktails");
        if (cocktails) {
            res.send(cocktails);
        }
        else {
            res.send("No user found");
        }
    }
    else {
        res.send("No user provided");
    }
});

// Provide JSON file in body
// Adding a new entry
router.post("/", async (req, res) => {
    const body = req.body;
    if (body) {
        const name = body.name;
        const id = body.id;
        const image = body.image;
        const username = body.username;
        let cocktails = await User.find({ username: username }, "cocktails").exec();
        if (cocktails) {
            let index = -1;
            for (let i = 0; i !== cocktails[0].cocktails.length; i++) {
                if (cocktails[0].cocktails[i].id === id) {
                    index = i;
                }
            }
            if (index === -1) {
                let data = {};
                data = Object.assign({}, data, {
                    name: name,
                    id: id,
                    image: image
                });
                cocktails[0].cocktails.push(data);
            }
            User.findOneAndUpdate({ username: username }, { cocktails: cocktails[0].cocktails }, (err, info) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(info);
                }
            })
        }
        else {
            res.send("No data provided");
        }
    }
    else {
        res.send("No data provided");
    }
});

// Provide JSON file in body
// Deleting an entry
router.delete("/delete", async (req, res) => {
    if (req.body.id && req.body.username) {
        const id = req.body.id;
        let cocktails = await User.find({ username: req.body.username }, "cocktails");
        if (cocktails) {
            let index = -1;
            for (let i = 0; i !== cocktails[0].cocktails.length; i++) {
                if (cocktails[0].cocktails[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                cocktails[0].cocktails.splice(index, 1);
                User.findOneAndUpdate({ username: req.body.username }, { cocktails: cocktails[0].cocktails }, (err, info) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send("Record deleted");
                    }
                })
            }
            else {
                res.status(404).send("Record not found");
            }
        }
        else {
            res.send("User not found");
        }
    }
    else {
        res.send("No data provided");
    }
})
module.exports = router;