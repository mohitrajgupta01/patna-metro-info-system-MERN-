require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Station = require("../models/Station");
const Route = require("../models/Route");
const Fare = require("../models/Fare");

const stations = [
  {
    stationId: "PMR01",
    name: "Danapur Cantonment",
    code: "DANP",
    line: "Line 1",
    sequence: 1,
    latitude: 25.5838,
    longitude: 85.0475,
    facilities: ["Parking", "Washroom", "Elevator", "Escalator", "WiFi"],
    connectivity: ["Railway", "Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Danapur Cantonment Railway Station, Danapur",
    nearbyPlaces: ["Danapur Railway Station", "Cantonment Area"],
  },
  {
    stationId: "PMR02",
    name: "Saguna Mor",
    code: "SAGN",
    line: "Line 1",
    sequence: 2,
    latitude: 25.5951,
    longitude: 85.0612,
    facilities: ["Parking", "Washroom", "Elevator", "WiFi"],
    connectivity: ["Bus", "Auto", "Cycle Rickshaw"],
    operationalStatus: "Operational",
    address: "Saguna Mor, Patna",
    nearbyPlaces: ["Saguna Market", "Local Shops"],
  },
  {
    stationId: "PMR03",
    name: "RPS Mor",
    code: "RPSM",
    line: "Line 1",
    sequence: 3,
    latitude: 25.6045,
    longitude: 85.0723,
    facilities: ["Parking", "Washroom", "WiFi"],
    connectivity: ["Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "RPS Mor, Patna",
    nearbyPlaces: ["RPS Complex", "Residential Area"],
  },
  {
    stationId: "PMR04",
    name: "Patliputra",
    code: "PTLP",
    line: "Line 1",
    sequence: 4,
    latitude: 25.6123,
    longitude: 85.0845,
    facilities: ["Parking", "Washroom", "Elevator", "Escalator", "WiFi", "ATM"],
    connectivity: ["Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Patliputra, Patna",
    nearbyPlaces: ["Patliputra Sports Complex", "Hotels"],
  },
  {
    stationId: "PMR05",
    name: "Rukanpura",
    code: "RUKN",
    line: "Line 1",
    sequence: 5,
    latitude: 25.6198,
    longitude: 85.0967,
    facilities: ["Parking", "Washroom", "WiFi"],
    connectivity: ["Bus", "Auto", "Cycle Rickshaw"],
    operationalStatus: "Operational",
    address: "Rukanpura, Patna",
    nearbyPlaces: ["Rukanpura Market", "Residential Colony"],
  },
  {
    stationId: "PMR06",
    name: "Raja Bazar",
    code: "RAJB",
    line: "Line 1",
    sequence: 6,
    latitude: 25.6267,
    longitude: 85.1089,
    facilities: ["Parking", "Washroom", "Elevator", "WiFi", "ATM"],
    connectivity: ["Bus", "Auto", "Taxi", "Cycle Rickshaw"],
    operationalStatus: "Operational",
    address: "Raja Bazar, Patna",
    nearbyPlaces: ["Raja Bazar Market", "Shopping Complex"],
  },
  {
    stationId: "PMR07",
    name: "Patna Zoo",
    code: "PZOO",
    line: "Line 1",
    sequence: 7,
    latitude: 25.6334,
    longitude: 85.1201,
    facilities: ["Parking", "Washroom", "Elevator", "WiFi"],
    connectivity: ["Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Near Sanjay Gandhi Biological Park, Patna",
    nearbyPlaces: ["Patna Zoo", "Sanjay Gandhi Biological Park"],
  },
  {
    stationId: "PMR08",
    name: "Vikas Bhawan",
    code: "VIKB",
    line: "Line 1",
    sequence: 8,
    latitude: 25.6401,
    longitude: 85.1323,
    facilities: ["Parking", "Washroom", "Elevator", "WiFi"],
    connectivity: ["Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Vikas Bhawan, Patna",
    nearbyPlaces: ["Government Offices", "Administrative Complex"],
  },
  {
    stationId: "PMR09",
    name: "Vidyut Bhawan",
    code: "VIDY",
    line: "Line 1",
    sequence: 9,
    latitude: 25.6468,
    longitude: 85.1445,
    facilities: ["Parking", "Washroom", "WiFi"],
    connectivity: ["Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Vidyut Bhawan, Patna",
    nearbyPlaces: ["Electricity Board Office", "Government Complex"],
  },
  {
    stationId: "PMR11",
    name: "Patna Junction",
    code: "PNBE",
    line: "Line 1",
    sequence: 11,
    latitude: 25.6602,
    longitude: 85.1689,
    facilities: [
      "Parking",
      "Washroom",
      "Elevator",
      "Escalator",
      "WiFi",
      "ATM",
      "Food Court",
    ],
    connectivity: ["Railway", "Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Patna Junction Railway Station, Patna",
    nearbyPlaces: ["Patna Junction Railway Station", "Hotels", "Markets"],
    isInterchange: true,
    interchangeLines: ["Line 1", "Line 2"],
  },
  {
    stationId: "PMR12",
    name: "CNLU",
    code: "CNLU",
    line: "Line 1",
    sequence: 12,
    latitude: 25.6669,
    longitude: 85.1811,
    facilities: ["Parking", "Washroom", "WiFi"],
    connectivity: ["Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Chandragupt National Law University, Patna",
    nearbyPlaces: ["CNLU Campus", "Educational Complex"],
  },
  {
    stationId: "PMR13",
    name: "Mithapur",
    code: "MITH",
    line: "Line 1",
    sequence: 13,
    latitude: 25.6736,
    longitude: 85.1933,
    facilities: ["Parking", "Washroom", "WiFi"],
    connectivity: ["Bus", "Auto", "Cycle Rickshaw"],
    operationalStatus: "Operational",
    address: "Mithapur, Patna",
    nearbyPlaces: ["Mithapur Market", "Residential Area"],
  },
  {
    stationId: "PMR14",
    name: "Ramkrishna Nagar",
    code: "RMKN",
    line: "Line 1",
    sequence: 14,
    latitude: 25.6803,
    longitude: 85.2055,
    facilities: ["Parking", "Washroom", "WiFi"],
    connectivity: ["Bus", "Auto", "Cycle Rickshaw"],
    operationalStatus: "Operational",
    address: "Ramkrishna Nagar, Patna",
    nearbyPlaces: ["Ramkrishna Nagar Colony", "Local Market"],
  },
  {
    stationId: "PMR15",
    name: "Jaganpura",
    code: "JAGN",
    line: "Line 1",
    sequence: 15,
    latitude: 25.687,
    longitude: 85.2177,
    facilities: ["Parking", "Washroom", "WiFi"],
    connectivity: ["Bus", "Auto", "Cycle Rickshaw"],
    operationalStatus: "Operational",
    address: "Jaganpura, Patna",
    nearbyPlaces: ["Jaganpura Market", "Residential Colony"],
  },
  {
    stationId: "PMR16",
    name: "Khemni Chak",
    code: "KHCK",
    line: "Line 1",
    sequence: 16,
    latitude: 25.6937,
    longitude: 85.2299,
    facilities: ["Parking", "Washroom", "Elevator", "WiFi"],
    connectivity: ["Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Khemni Chak, Patna",
    nearbyPlaces: ["Khemni Chak Market", "Terminal Area"],
  },
  {
    stationId: "PMR17",
    name: "Patna Junction",
    code: "PNBE2",
    line: "Line 2",
    sequence: 1,
    latitude: 25.6602,
    longitude: 85.1689,
    facilities: [
      "Parking",
      "Washroom",
      "Elevator",
      "Escalator",
      "WiFi",
      "ATM",
      "Food Court",
    ],
    connectivity: ["Railway", "Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Patna Junction Railway Station, Patna",
    nearbyPlaces: ["Patna Junction Railway Station", "Hotels", "Markets"],
    isInterchange: true,
    interchangeLines: ["Line 1", "Line 2"],
  },
  {
    stationId: "PMR18",
    name: "Akashvani",
    code: "AKSH",
    line: "Line 2",
    sequence: 2,
    latitude: 25.6535,
    longitude: 85.1567,
    facilities: ["Parking", "Washroom", "WiFi"],
    connectivity: ["Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Akashvani, Patna",
    nearbyPlaces: ["All India Radio Station", "Media Complex"],
  },
  {
    stationId: "PMR19",
    name: "Gandhi Maidan",
    code: "GM",
    line: "Line 2",
    sequence: 3,
    latitude: 25.6123,
    longitude: 85.1634,
    facilities: ["Parking", "Washroom", "Elevator", "WiFi"],
    connectivity: ["Bus", "Auto", "Cycle Rickshaw"],
    operationalStatus: "Operational",
    address: "Gandhi Maidan, Patna",
    nearbyPlaces: ["Gandhi Maidan Ground", "Historic Area"],
  },
  {
    stationId: "PMR20",
    name: "PMCH",
    code: "PMCH",
    line: "Line 2",
    sequence: 4,
    latitude: 25.6089,
    longitude: 85.1756,
    facilities: ["Parking", "Washroom", "WiFi"],
    connectivity: ["Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "PMCH, Patna",
    nearbyPlaces: ["Patna Medical College", "Hospital Complex"],
  },
  {
    stationId: "PMR21",
    name: "University",
    code: "UNIV",
    line: "Line 2",
    sequence: 5,
    latitude: 25.6156,
    longitude: 85.1878,
    facilities: ["Parking", "Washroom", "Elevator", "WiFi"],
    connectivity: ["Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Patna University, Patna",
    nearbyPlaces: ["Patna University", "Educational Complex"],
  },
  {
    stationId: "PMR22",
    name: "Moin-ul-Haq Stadium",
    code: "MOIQ",
    line: "Line 2",
    sequence: 6,
    latitude: 25.6223,
    longitude: 85.1989,
    facilities: ["Parking", "Washroom", "WiFi"],
    connectivity: ["Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Moin-ul-Haq Stadium, Patna",
    nearbyPlaces: ["Sports Stadium", "Athletic Complex"],
  },
  {
    stationId: "PMR23",
    name: "Rajendra Nagar",
    code: "RAJN",
    line: "Line 2",
    sequence: 7,
    latitude: 25.629,
    longitude: 85.2101,
    facilities: ["Parking", "Washroom", "Elevator", "WiFi"],
    connectivity: ["Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Rajendra Nagar, Patna",
    nearbyPlaces: ["Rajendra Nagar Area", "Residential Complex"],
  },
  {
    stationId: "PMR24",
    name: "Malahi Pakri",
    code: "MLPK",
    line: "Line 2",
    sequence: 8,
    latitude: 25.6357,
    longitude: 85.2223,
    facilities: ["Parking", "Washroom", "Elevator", "WiFi"],
    connectivity: ["Railway", "Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Malahi Pakri, Patna",
    nearbyPlaces: ["Malahi Pakri Area", "Local Markets"],
  },
  {
    stationId: "PMR25",
    name: "Khemni Chak",
    code: "KHCK2",
    line: "Line 2",
    sequence: 9,
    latitude: 25.6424,
    longitude: 85.2345,
    facilities: ["Parking", "Washroom", "WiFi"],
    connectivity: ["Bus", "Auto", "Cycle Rickshaw"],
    operationalStatus: "Operational",
    address: "Khemni Chak, Patna",
    nearbyPlaces: ["Khemni Chak Market", "Terminal Area"],
    isInterchange: true,
    interchangeLines: ["Line 1", "Line 2"],
  },
  {
    stationId: "PMR26",
    name: "Bhootnath",
    code: "BHTN",
    line: "Line 2",
    sequence: 10,
    latitude: 25.6491,
    longitude: 85.2467,
    facilities: ["Parking", "Washroom", "WiFi"],
    connectivity: ["Bus", "Auto", "Cycle Rickshaw"],
    operationalStatus: "Operational",
    address: "Bhootnath, Patna",
    nearbyPlaces: ["Bhootnath Market", "Local Area"],
  },
  {
    stationId: "PMR27",
    name: "Zero Mile",
    code: "ZERO",
    line: "Line 2",
    sequence: 11,
    latitude: 25.6558,
    longitude: 85.2589,
    facilities: ["Parking", "Washroom", "WiFi"],
    connectivity: ["Bus", "Auto", "Taxi"],
    operationalStatus: "Operational",
    address: "Zero Mile, Patna",
    nearbyPlaces: ["Zero Mile Marker", "Highway Junction"],
  },
  {
    stationId: "PMR28",
    name: "New ISBT",
    code: "NISB",
    line: "Line 2",
    sequence: 12,
    latitude: 25.6625,
    longitude: 85.2711,
    facilities: [
      "Parking",
      "Washroom",
      "Elevator",
      "Escalator",
      "WiFi",
      "ATM",
      "Food Court",
    ],
    connectivity: ["Bus", "Auto", "Taxi", "Inter-state Bus"],
    operationalStatus: "Operational",
    address: "New ISBT, Patna",
    nearbyPlaces: [
      "New Inter State Bus Terminal",
      "Long Distance Bus Services",
    ],
  },
];

const routes = [
  {
    routeId: "RT01",
    lineName: "Line 1",
    startStation: "Danapur Cantonment",
    endStation: "Khemni Chak",
    totalStations: 15,
    totalDistance: 12.8,
    estimatedTime: 35,
    stations: [
      { stationCode: "DANP", stationName: "Danapur Cantonment", sequence: 1 },
      { stationCode: "SAGN", stationName: "Saguna Mor", sequence: 2 },
      { stationCode: "RPSM", stationName: "RPS Mor", sequence: 3 },
      { stationCode: "PTLP", stationName: "Patliputra", sequence: 4 },
      { stationCode: "RUKN", stationName: "Rukanpura", sequence: 5 },
      { stationCode: "RAJB", stationName: "Raja Bazar", sequence: 6 },
      { stationCode: "PZOO", stationName: "Patna Zoo", sequence: 7 },
      { stationCode: "VIKB", stationName: "Vikas Bhawan", sequence: 8 },
      { stationCode: "VIDY", stationName: "Vidyut Bhawan", sequence: 9 },
      { stationCode: "PNBE", stationName: "Patna Junction", sequence: 10 },
      { stationCode: "CNLU", stationName: "CNLU", sequence: 11 },
      { stationCode: "MITH", stationName: "Mithapur", sequence: 12 },
      { stationCode: "RMKN", stationName: "Ramkrishna Nagar", sequence: 13 },
      { stationCode: "JAGN", stationName: "Jaganpura", sequence: 14 },
      { stationCode: "KHCK", stationName: "Khemni Chak", sequence: 15 },
    ],
    frequency: "Every 5-8 minutes",
    color: "#FF0000",
    status: "Operational",
  },
  {
    routeId: "RT02",
    lineName: "Line 2",
    startStation: "Patna Junction",
    endStation: "New ISBT",
    totalStations: 12,
    totalDistance: 8.5,
    estimatedTime: 28,
    stations: [
      { stationCode: "PNBE2", stationName: "Patna Junction", sequence: 1 },
      { stationCode: "AKSH", stationName: "Akashvani", sequence: 2 },
      { stationCode: "GM", stationName: "Gandhi Maidan", sequence: 3 },
      { stationCode: "PMCH", stationName: "PMCH", sequence: 4 },
      { stationCode: "UNIV", stationName: "University", sequence: 5 },
      { stationCode: "MOIQ", stationName: "Moin-ul-Haq Stadium", sequence: 6 },
      { stationCode: "RAJN", stationName: "Rajendra Nagar", sequence: 7 },
      { stationCode: "MLPK", stationName: "Malahi Pakri", sequence: 8 },
      { stationCode: "KHCK2", stationName: "Khemni Chak", sequence: 9 },
      { stationCode: "BHTN", stationName: "Bhootnath", sequence: 10 },
      { stationCode: "ZERO", stationName: "Zero Mile", sequence: 11 },
      { stationCode: "NISB", stationName: "New ISBT", sequence: 12 },
    ],
    frequency: "Every 6-10 minutes",
    color: "#0000FF",
    status: "Operational",
  },
];

const generateFares = () => {
  const fares = [];
  const line1Stations = [
    "DANP",
    "SAGN",
    "RPSM",
    "PTLP",
    "RUKN",
    "RAJB",
    "PZOO",
    "VIKB",
    "VIDY",
    "PNBE",
    "CNLU",
    "MITH",
    "RMKN",
    "JAGN",
    "KHCK",
  ];
  const line2Stations = [
    "PNBE2",
    "AKSH",
    "GAND",
    "PMCH",
    "UNIV",
    "MOIQ",
    "RAJN",
    "MLPK",
    "KHCK2",
    "BHTN",
    "ZERO",
    "NISB",
  ];

  // Generate fares for Line 1
  for (let i = 0; i < line1Stations.length; i++) {
    for (let j = i + 1; j < line1Stations.length; j++) {
      const distance = (j - i) * 0.85;
      let fare = 10;
      if (distance > 3) fare = 15;
      if (distance > 6) fare = 20;
      if (distance > 9) fare = 25;
      if (distance > 12) fare = 30;
      const cardFare = Math.round(fare * 0.9);
      const duration = (j - i) * 2.5;

      fares.push({
        fromStation: line1Stations[i],
        toStation: line1Stations[j],
        fromStationName:
          stations.find((s) => s.code === line1Stations[i])?.name ||
          line1Stations[i],
        toStationName:
          stations.find((s) => s.code === line1Stations[j])?.name ||
          line1Stations[j],
        distance: parseFloat(distance.toFixed(2)),
        fare: fare,
        cardFare: cardFare,
        duration: Math.round(duration),
        line: "Line 1",
      });
    }
  }

  // Generate fares for Line 2
  for (let i = 0; i < line2Stations.length; i++) {
    for (let j = i + 1; j < line2Stations.length; j++) {
      const distance = (j - i) * 0.77;
      let fare = 10;
      if (distance > 3) fare = 15;
      if (distance > 6) fare = 20;
      if (distance > 9) fare = 25;
      const cardFare = Math.round(fare * 0.9);
      const duration = (j - i) * 2.8;

      fares.push({
        fromStation: line2Stations[i],
        toStation: line2Stations[j],
        fromStationName:
          stations.find((s) => s.code === line2Stations[i])?.name ||
          line2Stations[i],
        toStationName:
          stations.find((s) => s.code === line2Stations[j])?.name ||
          line2Stations[j],
        distance: parseFloat(distance.toFixed(2)),
        fare: fare,
        cardFare: cardFare,
        duration: Math.round(duration),
        line: "Line 2",
      });
    }
  }

  // Generate interchange fares (PNBE to Line 2 stations)
  for (let i = 1; i < line2Stations.length; i++) {
    const distance = i * 0.77 + 1;
    let fare = 15;
    if (distance > 6) fare = 20;
    if (distance > 9) fare = 25;
    const cardFare = Math.round(fare * 0.9);
    const duration = i * 2.8 + 5;

    fares.push({
      fromStation: "PNBE",
      toStation: line2Stations[i],
      fromStationName: "Patna Junction",
      toStationName:
        stations.find((s) => s.code === line2Stations[i])?.name ||
        line2Stations[i],
      distance: parseFloat(distance.toFixed(2)),
      fare: fare,
      cardFare: cardFare,
      duration: Math.round(duration),
      line: "Interchange",
    });

    fares.push({
      fromStation: line2Stations[i],
      toStation: "PNBE",
      fromStationName:
        stations.find((s) => s.code === line2Stations[i])?.name ||
        line2Stations[i],
      toStationName: "Patna Junction",
      distance: parseFloat(distance.toFixed(2)),
      fare: fare,
      cardFare: cardFare,
      duration: Math.round(duration),
      line: "Interchange",
    });
  }

  // Generate cross-line fares (Line 1 to Line 2 via interchanges)
  for (let i = 0; i < line1Stations.length; i++) {
    for (let j = 0; j < line2Stations.length; j++) {
      // Skip if it's the same interchange station
      if (
        (line1Stations[i] === "PNBE" && line2Stations[j] === "PNBE2") ||
        (line1Stations[i] === "KHCK" && line2Stations[j] === "KHCK2")
      ) {
        continue;
      }

      // Calculate via Patna Junction
      const line1ToPNBE = Math.abs(line1Stations.indexOf("PNBE") - i) * 0.85;
      const PNBEToLine2 = j * 0.77 + 1;
      const totalDistancePNBE = line1ToPNBE + PNBEToLine2;

      // Calculate via Khemni Chak
      const line1ToKHCK = Math.abs(line1Stations.indexOf("KHCK") - i) * 0.85;
      const KHCKToLine2 = Math.abs(line2Stations.indexOf("KHCK2") - j) * 0.77;
      const totalDistanceKHCK = line1ToKHCK + KHCKToLine2;

      // Choose the shorter route
      const isViaPNBE = totalDistancePNBE <= totalDistanceKHCK;
      const totalDistance = isViaPNBE ? totalDistancePNBE : totalDistanceKHCK;
      const interchangeStation = isViaPNBE ? "Patna Junction" : "Khemni Chak";

      // Calculate fare based on total distance
      let fare = 20; // Base fare for cross-line
      if (totalDistance > 3) fare = 25;
      if (totalDistance > 6) fare = 30;
      if (totalDistance > 9) fare = 35;
      if (totalDistance > 12) fare = 40;

      const cardFare = Math.round(fare * 0.9);
      const duration = Math.round(totalDistance * 3 + 10); // Extra time for interchange

      // Generate travel instructions
      const fromStationName =
        stations.find((s) => s.code === line1Stations[i])?.name ||
        line1Stations[i];
      const toStationName =
        stations.find((s) => s.code === line2Stations[j])?.name ||
        line2Stations[j];

      const travelInstructions = isViaPNBE
        ? `Board Line 1 from ${fromStationName} → Travel to Patna Junction → Change to Line 2 → Travel to ${toStationName}`
        : `Board Line 1 from ${fromStationName} → Travel to Khemni Chak → Change to Line 2 → Travel to ${toStationName}`;

      fares.push({
        fromStation: line1Stations[i],
        toStation: line2Stations[j],
        fromStationName: fromStationName,
        toStationName: toStationName,
        distance: parseFloat(totalDistance.toFixed(2)),
        fare: fare,
        cardFare: cardFare,
        duration: duration,
        line: "Cross-line",
        interchangeVia: interchangeStation,
        travelInstructions: travelInstructions,
      });

      // Reverse direction with instructions
      const reverseTravelInstructions = isViaPNBE
        ? `Board Line 2 from ${toStationName} → Travel to Patna Junction → Change to Line 1 → Travel to ${fromStationName}`
        : `Board Line 2 from ${toStationName} → Travel to Khemni Chak → Change to Line 1 → Travel to ${fromStationName}`;

      fares.push({
        fromStation: line2Stations[j],
        toStation: line1Stations[i],
        fromStationName: toStationName,
        toStationName: fromStationName,
        distance: parseFloat(totalDistance.toFixed(2)),
        fare: fare,
        cardFare: cardFare,
        duration: duration,
        line: "Cross-line",
        interchangeVia: interchangeStation,
        travelInstructions: reverseTravelInstructions,
      });
    }
  }

  return fares;
};

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");

    console.log("Clearing existing data...");
    await Station.deleteMany({});
    await Route.deleteMany({});
    await Fare.deleteMany({});
    console.log("Existing data cleared");

    console.log("Seeding stations...");
    await Station.insertMany(stations);
    console.log(`${stations.length} stations seeded successfully`);

    console.log("Seeding routes...");
    await Route.insertMany(routes);
    console.log(`${routes.length} routes seeded successfully`);

    console.log("Generating and seeding fares...");
    const fares = generateFares();
    await Fare.insertMany(fares);
    console.log(`${fares.length} fares seeded successfully`);

    console.log("Database seeding completed successfully!");
    console.log(`Total stations: ${stations.length}`);
    console.log(`Total routes: ${routes.length}`);
    console.log(`Total fares: ${fares.length}`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
