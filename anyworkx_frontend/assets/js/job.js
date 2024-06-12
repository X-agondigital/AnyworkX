function getJobPositions() {
  const loader = document.querySelector(".job-loader");
  const positionsWrapper = document.querySelector(".positions--wrapper");
  if (!loader || !positionsWrapper) {
    // Elements not found, handle this scenario
    return;
  }
  loader.style.display = "block";
  positionsWrapper.style.display = "none";
  console.log("fetching jobs...");
  fetch("https://api.anyworkx.africa/api/admin/create/job/list/")
    .then((response) => response.json())
    .then((jobs) => {
      let output = ``;
      for (const [key, job] of Object.entries(jobs.jobs)) {
        // <-- use a different variable name here
        output += `
              <div class="open-position">
                  <a href="job-description.html?id=${job.id}">
                  <header>
                      <h5 id="job-position">${job.job_title}</h5>
                      <p class="small" id="job-location">${job.job_location}</p>
                  </header>
                  <i class="ri-arrow-right-s-line arrow-icon"></i>
                  </a>
              </div>
              `;
      }
      console.log("fetching complete");
      loader.style.display = "none";
      positionsWrapper.style.display = "block";

      document.querySelector(".positions--wrapper").innerHTML = output;
    })
    .catch((error) => {
      console.log(`Error loading job openings: ${error}`);
      loader.style.display = "none";
    });
}

getJobPositions();

const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get("id");

function getJobPosts() {
  fetch(`https://api.anyworkx.africa/api/admin/job/details/${jobId}/`)
    .then((response) => response.json())
    .then((jobs) => {
      const job = jobs; // Access the job details from the nested structure if applicable

      let breadCumb = ``;
      let outputTitle = ``;
      let output = ``;

      outputTitle = `
                        <h1 class="job-title">${job.job_title}</h1>
                    `;

      breadCumb = `
                        <a href="careers.html">careers</a> <i class="ri-arrow-right-s-line arrow-icon"></i> <a href="#"
                        class="active">${job.job_title}</a>
                    `;

      output = `
                        <h2>${job.job_title}</h2>
                        <main class="job-description">
                            <article>
                                <p><pre>${job.job_description}</pre></p>
                            </article>
                            <br>
                            <h2>${job.job_requirements_title}</h2>
                            <article>
                                <p><pre>${job.job_requirements_body}</pre></p>
                            </article>
                            <br>
                            <h2>${job.offer_title}</h2>
                            <article>
                                <p><pre>${job.we_offer}</pre></p>
                            </article>
                        </main>
                    `;

      document.querySelector(".breadcumb-navigation").innerHTML = breadCumb;
      document.querySelector(".career-banner-section").innerHTML = outputTitle;
      document.querySelector(".job-description-section").innerHTML = output;
    })
    .catch((error) => {
      console.log(`Error loading job openings: ${error}`);
    });
}

getJobPosts();

//Function for applying for job
const applicationForm = document.getElementById("application-form");
const textButton = document.querySelector(".btn-text");
const loadingSpinner = document.getElementById("loading-spinner");
loadingSpinner.style.display = "none";

applicationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loadingSpinner.style.display = "inline-block";
  textButton.style.display = "none";

  const firstName = document.getElementById("first_name").value;
  const lastName = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const mobileNo = document.getElementById("phone_number").value;
  const ageRange = document.getElementById("age-range").value;
  const address = document.getElementById("address").value;
  const state = document.getElementById("state").value;
  const country = document.getElementById("country").value;
  const coverLetter = document.getElementById("cover_letter").value;
  const resume = document.getElementById("cv_upload").files[0];
  const salary = document.getElementById("salary").value;

  const formData = new FormData();
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("email", email);
  formData.append("phone_number", mobileNo);
  formData.append("age", ageRange);
  formData.append("address", address);
  formData.append("state", state);
  formData.append("country", country);
  formData.append("cover_letter", coverLetter);
  formData.append("cv_upload", resume);
  formData.append("salary", salary);

  fetch(`https://api.anyworkx.africa/api/applicant/jobs/apply/${jobId}/`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // clear the form
      applicationForm.reset();
      applicationForm.style.display = "none";
      // display success message

      const successMsg = document.getElementById("response-message");
      successMsg.classList.add("response--success-message");
      successMsg.textContent = "Application submitted successfully!";
      // applicationForm.insertAdjacentElement("beforebegin", successMsg);
    })
    .catch((err) => console.log(err));
});
