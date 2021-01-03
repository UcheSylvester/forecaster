const axios = require("axios");

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// using callback pattern
const forecast = (longitude = "", latitude = "", callback) => {
  const options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/weather",
    params: {
      q: "nigeria",
      units: "imperial",
      lon: longitude,
      lat: latitude,
    },
    headers: {
      "x-rapidapi-key": "0de5ccfe0bmsh961687a5f8c9383p10e2ddjsn4b65482538e8",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then((response) => {
      const {
        weather,
        main: { feels_like },
      } = response.data;
      const { description } = weather[0];

      const forecast = `${description}. It's currently ${feels_like} degrees out.`;
      callback(undefined, forecast);
    })
    .catch((error) => {
      callback("unable to connect to weather services, please try again");
    });
};

module.exports = forecast;
