let jobName = document.getElementById("nameHASHED").value;
let email = document.getElementById("emailHASHED").value;
let mobileNo = document.getElementById("mobile-no").value;
let country = document.getElementById("country").value;
let coverLetter = document.getElementById("cover-letter").value;
let resume = document.getElementById("resume").value;
let salary = document.getElementById("salary").value;
let socialLinks = document.getElementById("social-links").value;

function postJob(e) {
  e.preventDefault();

  fetch(
    "http://142.93.98.21:8000/api/jobs/apply/9938b621-59fb-455a-8e72-ae66abbb448c/",
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: jobName,
        email: email,
        number: mobileNo,
        country: country,
        cover_letter: coverLetter,
        resume: resume,
        salary: salary,
        social_links: socialLinks,
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }
  );
}
