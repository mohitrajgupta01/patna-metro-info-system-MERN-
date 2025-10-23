const mongoose = require("mongoose");

const FareSchema = new mongoose.Schema(
  {
    fromStation: {
      type: String,
      required: true,
    },
    toStation: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true, // in kilometers
    },
    fare: {
      type: Number,
      required: true, // in rupees
    },
    duration: {
      type: Number,
      required: true, // in minutes
    },
    cardFare: {
      type: Number, // discounted fare for smart card users
    },
    line: {
      type: String, // Line 1, Line 2, Cross-line, Interchange
    },
    interchangeVia: {
      type: String, // Patna Junction or Khemni Chak for cross-line journeys
    },
    travelInstructions: {
      type: String, // Step-by-step travel guidance
    },
    fromStationName: {
      type: String, // Human-readable from station name
    },
    toStationName: {
      type: String, // Human-readable to station name
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
FareSchema.index({ fromStation: 1, toStation: 1 });

module.exports = mongoose.model("Fare", FareSchema);
