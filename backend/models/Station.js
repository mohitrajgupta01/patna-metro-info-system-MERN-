const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema(
  {
    stationId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    line: {
      type: String,
      enum: ["Line 1", "Line 2"],
      required: true,
    },
    sequence: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    facilities: [
      {
        type: String,
        enum: [
          "Parking",
          "Washroom",
          "Elevator",
          "Escalator",
          "WiFi",
          "ATM",
          "Food Court",
          "Disabled Friendly",
        ],
      },
    ],
    connectivity: [
      {
        type: String,
      },
    ],
    operationalStatus: {
      type: String,
      enum: ["Operational", "Under Construction", "Planned"],
      default: "Operational",
    },
    openingTime: {
      type: String,
      default: "06:00",
    },
    closingTime: {
      type: String,
      default: "22:00",
    },
    address: {
      type: String,
      required: true,
    },
    nearbyPlaces: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Station", StationSchema);
