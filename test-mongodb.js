const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("Testing MongoDB connection...");
console.log("URI:", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    console.log("Database Name:", mongoose.connection.db.databaseName);
    console.log("Host:", mongoose.connection.host);

    // List collections
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error("Error listing collections:", err);
      } else {
        console.log("\nExisting Collections:");
        if (collections.length === 0) {
          console.log("  No collections found (database is empty)");
        } else {
          collections.forEach((col) => {
            console.log(`  - ${col.name}`);
          });
        }
      }
      mongoose.connection.close();
      process.exit(0);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error("Error Name:", err.name);
    console.error("Error Message:", err.message);

    if (err.message.includes("bad auth")) {
      console.log("\n🔧 Solution: The username or password is incorrect.");
      console.log("   1. Go to MongoDB Atlas (cloud.mongodb.com)");
      console.log("   2. Database Access → Check your user credentials");
      console.log("   3. Reset the password if needed");
      console.log("   4. Update the .env file with correct credentials");
    } else if (err.message.includes("ENOTFOUND")) {
      console.log("\n🔧 Solution: Cannot reach MongoDB server.");
      console.log("   1. Check your internet connection");
      console.log("   2. Verify the cluster URL is correct");
    } else if (err.message.includes("IP")) {
      console.log("\n🔧 Solution: Your IP address is not whitelisted.");
      console.log("   1. Go to MongoDB Atlas → Network Access");
      console.log(
        "   2. Add your current IP or allow access from anywhere (0.0.0.0/0)"
      );
    }

    process.exit(1);
  });
