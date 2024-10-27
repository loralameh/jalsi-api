// Register module aliases for cleaner import paths
require("module-alias/register");
const dbConnect = require("@db/dbconnect.js");

// Import the Express framework
const express = require("express");

// Import the CORS middleware to enable Cross-Origin Resource Sharing
const cors = require("cors");

// Create an instance of an Express application
const app = express();

// Define the port number on which the server will listen
const port = 3000;

// Enable CORS for routes; allow only requests from a "clinikit.io" subdomain
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin.endsWith(".clinikit.io")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Import the routes defined in the routes.js file
const routes = require("./routes");

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the imported routes in the application
app.use("/api", routes);

// Define a route for the root URL that responds with "hello world"
app.get("/", (req, res) => {
  res.send("hello world");
});

// Start the server and listen on the defined port
const start = async () => {
  try {
    await dbConnect();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
