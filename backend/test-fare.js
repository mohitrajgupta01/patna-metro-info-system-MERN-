require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Fare = require("./models/Fare");

const testFare = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Test fare from Danapur Cantonment to Rajendra Nagar
    const fare1 = await Fare.findOne({
      fromStation: "DANP",
      toStation: "RAJN",
    });

    if (fare1) {
      console.log("\n🚇 Journey: Danapur Cantonment → Rajendra Nagar");
      console.log("═══════════════════════════════════════════════");
      console.log(`💰 Fare: ₹${fare1.fare} (Card: ₹${fare1.cardFare})`);
      console.log(`📏 Distance: ${fare1.distance} km`);
      console.log(`⏰ Duration: ${fare1.duration} minutes`);
      console.log(`🔄 Via: ${fare1.interchangeVia}`);
      console.log(`🗺️  Instructions:`);
      console.log(`   ${fare1.travelInstructions}`);
    }

    // Test reverse direction
    const fare2 = await Fare.findOne({
      fromStation: "RAJN",
      toStation: "DANP",
    });

    if (fare2) {
      console.log("\n🚇 Journey: Rajendra Nagar → Danapur Cantonment");
      console.log("══════════════════════════════════════════════");
      console.log(`💰 Fare: ₹${fare2.fare} (Card: ₹${fare2.cardFare})`);
      console.log(`📏 Distance: ${fare2.distance} km`);
      console.log(`⏰ Duration: ${fare2.duration} minutes`);
      console.log(`🔄 Via: ${fare2.interchangeVia}`);
      console.log(`🗺️  Instructions:`);
      console.log(`   ${fare2.travelInstructions}`);
    }

    // Test a journey that uses Khemni Chak interchange
    const fare3 = await Fare.findOne({
      fromStation: "JAGN", // Jaganpura (Line 1)
      toStation: "NISB", // New ISBT (Line 2)
    });

    if (fare3) {
      console.log("\n🚇 Journey: Jaganpura → New ISBT");
      console.log("═══════════════════════════════");
      console.log(`💰 Fare: ₹${fare3.fare} (Card: ₹${fare3.cardFare})`);
      console.log(`📏 Distance: ${fare3.distance} km`);
      console.log(`⏰ Duration: ${fare3.duration} minutes`);
      console.log(`🔄 Via: ${fare3.interchangeVia}`);
      console.log(`🗺️  Instructions:`);
      console.log(`   ${fare3.travelInstructions}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

testFare();
