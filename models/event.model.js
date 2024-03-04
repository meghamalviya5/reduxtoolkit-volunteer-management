const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  description: String,
  volunteerRequirements: String,
  //   [
  //   {
  //     role: String,
  //     volunteerRequired: Number,
  //   },
  // ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };
