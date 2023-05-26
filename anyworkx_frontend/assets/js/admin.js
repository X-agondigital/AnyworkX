"use strict";
// function checkAuth() {
//   const adminToken = localStorage.getItem('adminToken');
//   if (!adminToken) {
//     // Admin is not logged in, redirect to login page
//     window.location.href = '../admin-login.html'; // Replace with your login page URL
//   }
// }

// function logout() {
//   localStorage.removeItem('adminToken');
//   // Redirect to the login page
//   window.location.href = '/login.html'; // Replace with your login page URL
// }

// document.getElementById('logout').addEventListener('click', logout())
// get admin token from localStorage
const adminToken = localStorage.getItem("adminToken");

//SCRIPT FOR POSTING JOBS TO THE SERVER
// Fetch job categories and populate dropdown
fetch("https://anyworkx.onrender.com/api/admin/create/job_category/",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`
    }
  })
    .then((response) => response.json())
    .then((jobCategories) => {
      const jobCategorySelect = document.getElementById("job-category");

      jobCategories.jobs_category.forEach((category) => {
        const categoryId = category.id;
        const categoryName = category.category_name;

        // Create option element
        const option = document.createElement("option");
        option.value = categoryId;
        option.textContent = categoryName;

        // Append option to select
        jobCategorySelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.log(`Error loading job categories: ${error}`);
    });

const form = document.getElementById("create-job");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const jobCategory = document.getElementById("job-category").value;
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
      "Authorization": `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      job_category: jobCategory,
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
      // setTimeout(window.location.href = 'all-job.html', 2000) ;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
