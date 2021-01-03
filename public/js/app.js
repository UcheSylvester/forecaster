const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const errorContainer = document.querySelector(".error");
const forecastContainer = document.querySelector(".forecast");

let isSubmitting = false;

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  isSubmitting = true;

  const location = input.value;

  forecastContainer.textContent = "loading...";
  errorContainer.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      const { error, forecast } = data;

      isSubmitting = false;
      forecastContainer.textContent = "";

      if (error) {
        errorContainer.textContent = error;

        return;
      }

      // console.log(data);

      forecastContainer.textContent = forecast;
    });
});
