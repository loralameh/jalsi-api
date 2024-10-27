const glob = require("glob");
const path = require("path");

// Find all files matching the pattern in the api directory and its subdirectories
let files = glob.sync(__dirname + "/api/**/*.routes.js");

// Normalize the directory name to use forward slashes
let dirname = __dirname.split("\\").join("/");

// Initialize an array to store the modified file paths
let _files = [];

// Iterate over the matched files and construct relative paths
for (e in files) {
  _files.push(`.${files[e].replace(dirname, "").replace(".js", "")}`);
}

// Create an instance of an Express Router
const Router = require("express").Router();

// Initialize a string to keep track of available routes for logging
let routes = `Available Routes:`;

// Log the available routes to the console
console.log("Available Routes:", _files);

// Iterate over the modified file paths
_files.forEach((route) => {
  // Log each route to the console
  console.log({ route });

  // Append the route information to the routes string
  routes += `
route: ${path.dirname(
    route.substring(1)
  )} \t=>\t file: ${dirname}${route.replace(".", "")}.js`;

  // Register the route with the Express Router
  Router.use(path.dirname(route.substring(1)), require(route));
});

// Log the complete list of available routes to the console
console.log({ routes });

// Export the configured Router as a module
module.exports = Router;
