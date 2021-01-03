const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

const app = express();

// Defining paths for express configs
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setting up hbs as a templating engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setting up express to use static files in pbulic directory
app.use(express.static(publicDirPath));

// setting up routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather Forcaster!",
    name: "Dan Eich",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Dan Eich",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Dan Eich",
    message: "You need some help? contact me at daneich@gmail.com",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address)
    return res.send({
      error: "You must provide an address",
    });

  // geocode for the longitude and latitude
  geocode(address, (error, data = {}) => {
    if (error) return res.send({ error });

    const { longitude, latitude, location } = data;

    // weather forecast using the longitude and the latitude
    forecast(longitude, latitude, (error, data) => {
      if (error) return res.send({ error });

      const forecast = `forecast for ${location}: ${data}`;

      res.send({ location, forecast, address });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404-page", {
    title: "404",
    message: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404-page", {
    title: "404!",
    message: "Page not found!",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
