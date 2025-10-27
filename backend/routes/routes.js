const express = require("express");
const router = express.Router();
const Route = require("../models/Route");

// Get all routes
router.get("/", async (req, res) => {
  try {
    const routes = await Route.find();
    res.json({
      success: true,
      count: routes.length,
      data: routes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get route by line name
router.get("/line/:lineName", async (req, res) => {
  try {
    const route = await Route.findOne({ lineName: req.params.lineName });
    if (!route) {
      return res.status(404).json({
        success: false,
        error: "Route not found",
      });
    }
    res.json({
      success: true,
      data: route,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create new route (admin)
router.post("/", async (req, res) => {
  try {
    const route = await Route.create(req.body);
    res.status(201).json({
      success: true,
      data: route,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
