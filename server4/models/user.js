const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    idRoom: Number,
    email: String,
    login: String,
    password: String,
    key: String,
    history: Array
});

module.exports = mongoose.model('User', UserSchema);