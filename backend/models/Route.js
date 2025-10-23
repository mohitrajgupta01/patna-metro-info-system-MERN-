const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema(
  {
    routeId: {
      type: String,
      required: true,
      unique: true,
    },
    lineName: {
      type: String,
      required: true,
      enum: ["Line 1", "Line 2"],
    },
    startStation: {
      type: String,
      required: true,
    },
    endStation: {
      type: String,
      required: true,
    },
    totalStations: {
      type: Number,
      required: true,
    },
    totalDistance: {
      type: Number,
      required: true, // in kilometers
    },
    estimatedTime: {
      type: Number,
      required: true, // in minutes
    },
    stations: [
      {
        stationCode: String,
        stationName: String,
        sequence: Number,
      },
    ],
    frequency: {
      type: String,
      default: "Every 10-15 minutes",
    },
    color: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Operational", "Under Construction", "Planned"],
      default: "Operational",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Route", RouteSchema);
