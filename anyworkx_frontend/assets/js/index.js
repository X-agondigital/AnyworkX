const form = document.getElementById("subscribe-form");
const responseMessage = document.getElementById("response-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents the default form submission behavior

  const formData = new FormData(form); // Creates a new FormData object with the form data
  const data = {
    email: formData.get("email"),
  }; // Creates a data object from the form data

  const url = "http://142.93.98.21:8000/api/subscribers/";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }; // Creates options for the fetch request

  try {
    const response = await fetch(url, options); // Sends the POST request to the API endpoint
    const responseData = await response.json(); // Parses the response data as JSON

    // Updates the response message
    responseMessage.textContent =
      responseData.status === "success"
        ? "Thank you for subscribing!"
        : responseData.message;
    responseMessage.classList.add("response--success-message");

    const messageDisappear = function () {
      responseMessage.style.display = "none";
    };

    setTimeout(messageDisappear, 5000);

    // Resets the form
    form.reset();
  } catch (error) {
    console.error(error); // Handles any errors that occur during the fetch request

    // Updates the response message
    responseMessage.textContent =
      "An error occurred while subscribing. Please try again.";
    responseMessage.classList.add("response--error-message");

    const messageDisappear = function () {
      responseMessage.style.display = "none";
    };

    setTimeout(messageDisappear, 5000);
  }
});
