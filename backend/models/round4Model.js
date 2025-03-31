const mongoose = require("mongoose");

const round4Schema = new mongoose.Schema({
    team: { type: String, required: true },
    participant1: { type: String, required: true },
    participant2: { type: String, required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date }
});

module.exports = mongoose.model("Round4", round4Schema, "treasure_hunt_round4");
