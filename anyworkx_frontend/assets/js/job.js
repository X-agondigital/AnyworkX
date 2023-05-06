function applyForJob(e) {
  e.preventDefault();

  const firstName = document.getElementById("first_name").value;
  const email = document.getElementById("email").value;
  const mobileNo = document.getElementById("phone_number").value;
  const state = document.getElementById("state").value;
  const country = document.getElementById("country").value;
  const coverconstter = document.getElementById("cover_constter").value;
  const socialLinks = document.getElementById("social-links").value;
  const resume = document.getElementById("cv_upload").value;
  const salary = document.getElementById("salary").value;

  fetch(
    "https://anyworkx.onrender.com/api/jobs/apply/be70a1a2-0d94-4177-8edd-d394070e1438/",
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
        cover_constter: coverconstter,
        cv_upload: resume,
        salary: salary,
      }),
    }
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  );
}
