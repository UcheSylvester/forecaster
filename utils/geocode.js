const axios = require("axios");

const geocode = (location, callback) => {
  const options = {
    method: "GET",
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
    params: {
      access_token:
        "pk.eyJ1IjoidWNoZXN5bHZlc3RlciIsImEiOiJjam50Z3hmejQwcDEyM3Bsa21tdmoxaWx1In0.JbG59U6JeibbsIWI8SvmWg",
    },
  };

  axios
    .request(options)
    .then((response) => {
      const locations = response.data.features;

      if (!locations.length) {
        return callback(
          "unable to find the locations you request, please try a different search term"
        );
      }

      // picking the coordinates from the first location
      const [firstLocation] = locations;
      const { place_name, center } = firstLocation;
      const [longitude, latitude] = center;

      callback(undefined, { location: place_name, longitude, latitude });
    })
    .catch((error) => {
      callback("Unable to connect to location services, please try again");
    });
};

module.exports = geocode;
