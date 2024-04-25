const form = document.getElementById("subscribe-form");
const responseMessage = document.getElementById("response-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents the default form submission behavior

  const formData = new FormData(form); // Creates a new FormData object with the form data
  const data = {
    email: formData.get("email"),
  }; // Creates a data object from the form data

  const url = "https://anyworkx.onrender.com/api/subscribers/";
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
    // console.error(error); // Handles any errors that occur during the fetch request

    // Updates the response message
    responseMessage.textContent =
      "An error occurred while subscribing. Please try again.";
    responseMessage.classList.add("response--error-message");

    for(let i =0; i<chatButton.length; i++){
      chatButton[i].classList.remove("button--loading");
      buttonText[i].style.visibility = "visible";
    }

    const messageDisappear = function () {
      responseMessage.style.display = "none";
    };

    setTimeout(messageDisappear, 5000);
  }
});


//-----TAB PANE CONTROLLER
const tabs = document.querySelectorAll("#tab-box");
const line = document.querySelector(".line");

for (let i = 0; i < tabs.length; i++) {
  line.style.width = tabs[i].offsetWidth + 3 + "px";
}
// tabs.forEach((tab, index) => {
//   tab.addEventListener("click", (e) => {
//     tabs.forEach((tab) => {
//       tab.classList.remove("active");
//     });
//     tab.classList.add("active");

//     const line = document.querySelector(".line");
//     line.style.width = e.target.offsetWidth + 3 + "px";
//     line.style.left = e.target.offsetLeft + "px";

//     all_content.forEach((content) => {
//       content.classList.remove("active");
//     });
//     all_content[index].classList.add("active");
//   });
// });
