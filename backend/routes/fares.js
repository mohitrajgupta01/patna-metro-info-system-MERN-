const express = require("express");
const router = express.Router();
const Fare = require("../models/Fare");

// Calculate fare between two stations
router.get("/calculate", async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        error: "Please provide both from and to stations",
      });
    }

    // Try both directions
    let fare = await Fare.findOne({
      fromStation: from,
      toStation: to,
    });

    if (!fare) {
      fare = await Fare.findOne({
        fromStation: to,
        toStation: from,
      });
    }

    if (!fare) {
      return res.status(404).json({
        success: false,
        error: "Fare information not available for this route",
      });
    }

    res.json({
      success: true,
      data: fare,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get all fares
router.get("/", async (req, res) => {
  try {
    const fares = await Fare.find();
    res.json({
      success: true,
      count: fares.length,
      data: fares,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get fare chart (unique distances and fares)
router.get("/chart", async (req, res) => {
  try {
    const fareChart = await Fare.aggregate([
      {
        $group: {
          _id: "$distance",
          minFare: { $min: "$fare" },
          maxFare: { $max: "$fare" },
          cardFare: { $first: "$cardFare" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.json({
      success: true,
      data: fareChart.map((item) => ({
        distance: item._id,
        fare: item.minFare,
        cardFare: item.cardFare,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create new fare (admin)
router.post("/", async (req, res) => {
  try {
    const fare = await Fare.create(req.body);
    res.status(201).json({
      success: true,
      data: fare,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
