const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    gameTable: Array,
    player: Number,
    player1Name: String,
    player2Name: String,
    firstLoad: Boolean,
    canClick: Boolean,
    winner: String,
    lastMove: Array,
    idRoom: Number
});

module.exports = mongoose.model('Room', RoomSchema);