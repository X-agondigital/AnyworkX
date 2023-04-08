let firstName = document.getElementById("first_name").value;
let email = document.getElementById("email").value;
let mobileNo = document.getElementById("phone_number").value;
let state = document.getElementById("state").value;
let country = document.getElementById("country").value;
let coverLetter = document.getElementById("cover_letter").value;
let resume = document.getElementById("cv_upload").value;
let salary = document.getElementById("salary").value;
// let socialLinks = document.getElementById("social-links").value;

function postJob(e) {
  e.preventDefault();

  fetch(
    "http://142.93.98.21:8000/api/jobs/apply/9938b621-59fb-455a-8e72-ae66abbb448c/",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        email: email,
        number: mobileNo,
        country: country,
        cover_letter: coverLetter,
        cv_upload: resume,
        salary: salary,
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
    }
  );
}
