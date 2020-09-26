const mongoose = require("mongoose");

var UserSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        cocktails: [{ id: String, name: String, image: String, }],
    }
);
module.exports = mongoose.model("User", UserSchema);