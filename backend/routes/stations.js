const express = require("express");
const router = express.Router();
const Station = require("../models/Station");

// Get all stations
router.get("/", async (req, res) => {
  try {
    const stations = await Station.find().sort({ line: 1, sequence: 1 });
    res.json({
      success: true,
      count: stations.length,
      data: stations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get station by code
router.get("/code/:code", async (req, res) => {
  try {
    const station = await Station.findOne({ code: req.params.code });
    if (!station) {
      return res.status(404).json({
        success: false,
        error: "Station not found",
      });
    }
    res.json({
      success: true,
      data: station,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get stations by line
router.get("/line/:lineName", async (req, res) => {
  try {
    const stations = await Station.find({ line: req.params.lineName }).sort({
      sequence: 1,
    });
    res.json({
      success: true,
      count: stations.length,
      data: stations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Search stations
router.get("/search/:query", async (req, res) => {
  try {
    const stations = await Station.find({
      $or: [
        { name: { $regex: req.params.query, $options: "i" } },
        { code: { $regex: req.params.query, $options: "i" } },
        { address: { $regex: req.params.query, $options: "i" } },
      ],
    });
    res.json({
      success: true,
      count: stations.length,
      data: stations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create new station (admin)
router.post("/", async (req, res) => {
  try {
    const station = await Station.create(req.body);
    res.status(201).json({
      success: true,
      data: station,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
