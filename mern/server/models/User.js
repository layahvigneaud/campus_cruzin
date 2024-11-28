const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    savedClubs: {type: [String], default: []},
    savedReviews: {type: [String], default: []}
});

// name of the collection that model is for
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;