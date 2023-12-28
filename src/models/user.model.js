const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {type: String, reqiure: true},
    password: {type: String, require: true}
})

const UserModel = mongoose.model("user", UserSchema);

module.exports = {
    getUserByUsername : async (username) => await UserModel.find({username}),
    createUser : async (data) => await UserModel.create(data)
}