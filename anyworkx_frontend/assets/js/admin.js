"use strict";

//SCRIPT FOR POSTING JOBS TO THE SERVER
const form = document.getElementById("create-job");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const jobTitle = document.getElementById("job-title").value;
  const jobDescription = document.getElementById("job_description").value;
  const jobPosition = document.getElementById("position").value;
  const jobLocation = document.getElementById("job-location").value;
  const jobRequirementsTitle = document.getElementById(
    "requirement-heading"
  ).value;
  const jobRequirements = document.getElementById("job-requirements").value;
  const skillRequirement = document.getElementById("skill-requirement").value;
  const anyworkxOffer = document.getElementById("offer").value;

  fetch("https://anyworkx.onrender.com/api/create/job/list/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      job_title: jobTitle,
      job_description: jobDescription,
      position: jobPosition,
      job_location: jobLocation,
      job_requirements_title: jobRequirementsTitle,
      job_requirements_body: jobRequirements,
      offer_title: skillRequirement,
      we_offer: anyworkxOffer,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
