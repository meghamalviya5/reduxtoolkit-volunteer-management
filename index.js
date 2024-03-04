const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./db/db.connection");
const { Volunteer } = require("./models/volunteer.model");
const { Event } = require("./models/event.model");

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/volunteers", async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    console.log("error occurred: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/volunteers", async (req, res) => {
  const {
    name,
    contact,
    skills,
    availability,
    areasOfInterest,
    assignedEvent,
  } = req.body;

  try {
    const volunteer = new Volunteer({
      name,
      contact,
      skills,
      availability,
      areasOfInterest,
      assignedEvent,
    });
    await volunteer.save();
    res.status(201).json(volunteer);
  } catch (error) {
    console.log("Error occurred while adding volunteer: ", error);
    res.status(500).json({ error: "Internal Server Error: " + error });
  }
});

app.put("/volunteers/:id", async (req, res) => {
  const volunteerId = req.params.id;
  const updatedVolunteerData = req.body;

  try {
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      volunteerId,
      updatedVolunteerData,
      { new: true },
    );

    if (!updatedVolunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.status(200).json(updatedVolunteer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/volunteers/:id", async (req, res) => {
  const volunteerId = req.params.id;

  try {
    const deletedVolunteer = await Volunteer.findByIdAndRemove(volunteerId);

    if (!deletedVolunteer) {
      return res.status(404).json({ error: "Volunteer not found" });
    }

    res.status(200).json({
      message: "Volunteer deleted successfully",
      volunteer: deletedVolunteer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//event CRUD operations
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.log("error occurred: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/events", async (req, res) => {
  const { name, date, location, description } = req.body;

  try {
    const event = new Event({ name, date, location, description });
    event.volunteerRequirements = req.body.volunteerRequirements;
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.log("Error occurred while adding event: ", error);
    res.status(500).json({ error: "Internal Server Error: " + error });
  }
});

app.put("/events/:id", async (req, res) => {
  const eventId = req.params.id;
  const updatedEventData = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      updatedEventData,
      { new: true },
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/events/:id", async (req, res) => {
  const eventId = req.params.id;

  try {
    const deletedEvent = await Event.findByIdAndRemove(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({
      message: "Event deleted successfully",
      event: deletedEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
