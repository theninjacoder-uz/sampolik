const mongoose = require("mongoose");

//Ambulance
const ambulanceSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  telephone: {
    type: String,
  },
  address: {
    type: String,
  },
});

const Ambulance = mongoose.model("ambulance", ambulanceSchema);

// Consulting
const consultSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  specialist: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  problems: {
    type: String,
  },
});

const Consult = mongoose.model("consult", consultSchema);

//doctor Meeting
const queueSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  specialist: {
    type: String,
  },
  meetDate: {
    type: Date,
  },
  meetTime: {
    type: String,
  },
});

const Queue = mongoose.model("queue", queueSchema);

module.exports = { Ambulance, Consult, Queue };
