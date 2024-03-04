const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  // name, contact information, skills, availability, and areas of interest
  name: String,
  contact: String,
  skills: String,
  availability: String,
  areasOfInterest: String,
  assignedEvent: String,
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = { Volunteer };
