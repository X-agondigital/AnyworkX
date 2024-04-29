const galleryParent = document.querySelector(".gallery--grid");
const galleryTable = document.getElementById("images-table-body");
const loadingOverlay = document.getElementById("loading-overlay");
const editImageForm = document.getElementById("edit-image");

const apiBaseUrl = "https://anyworkx.onrender.com/api/";

const getGalleryImages = function () {
  const getUrl = `${apiBaseUrl}upload`;
  if (loadingOverlay) {
    loadingOverlay.classList.add("active");
  }

  fetch(getUrl)
    .then((response) => response.json())
    .then((images) => {
      if (loadingOverlay) {
        loadingOverlay.classList.remove("active");
      }
      let output = ``;
      let tableOutput = ``;
      images.data.forEach((image) => {
        const imageId = image.id;
        output += `
            <figure>
            <img src="${image.image}" alt="" />
            <figcaption>
              ${image.description}
            </figcaption>
          </figure>
            `;

        tableOutput += `
          <tr>
            <td data-label="Image"><img src="${image.image}" class="table-img" alt=""></td>
            <td data-label="Description">${image.description}</td>
            <td><a href="edit-image.html?imageId=${imageId}" class="edit btn--action" data-id="${imageId}">Edit</a></td>
            <td><a class="delete delete-btn btn--action" data-id="${imageId}">Delete</a></td>
        </tr>
          `;
      });
      if (galleryParent) {
        galleryParent.innerHTML = output;
      }
      if (galleryTable) {
        galleryTable.innerHTML = tableOutput;
      }
    })
    .catch((error) => console.log("Error getting images", error));
};

if (galleryParent || galleryTable) {
  getGalleryImages();
}

//UPLOAD IMAGE SCRIPT
const imageForm = document.getElementById("create-image");
if (imageForm) {
  imageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const imageField = document.getElementById("image-field");
    const imageDescription = document.getElementById("img-description").value;

    loadingOverlay.classList.add("active");
    const postUrl = `${apiBaseUrl}upload/`;

    const formData = new FormData();
    if (imageField.files.length > 0) {
      formData.append("image", imageField.files[0]);
    } else {
      console.error("Please select an image to upload");
      e.preventDefault();
      return;
    }
    formData.append("description", imageDescription);

    fetch(postUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        const alertMessage = document.querySelector("#response-message");
        alertMessage.classList.add("response--error-message");
        alertMessage.textContent =
          "Something went wrong, please refresh and try again";
        loadingOverlay.classList.remove("active");
        console.log(error);
      });
  });
}

const urlParams = new URLSearchParams(window.location.search);
const imageId = urlParams.get("imageId");

const populateEditField = function (imageId) {
  const imageDescription = document.getElementById("img-description");
  const editImageUrl = `${apiBaseUrl}upload/${imageId}/`;
  fetch(editImageUrl)
    .then((response) => response.json())
    .then((imageData) => {
      imageDescription.value = imageData.payload.description;
    })
    .catch((error) => console.log(error));
};

if (editImageForm) {
  populateEditField(imageId);
}

const editGalleryImage = function (e) {
  e.preventDefault();
  const imageField = document.getElementById("image-field");
  const imageDescription = document.getElementById("img-description").value;
  const editImageUrl = `${apiBaseUrl}upload/${imageId}/`;

  const formData = new FormData();
  if (imageField.files.length > 0) {
    formData.append("image", imageField.files[0]);
  }
  formData.append("description", imageDescription);

  fetch(editImageUrl, {
    method: "PATCH",
    body: formData,
  
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

if (editImageForm) {
  editImageForm.addEventListener("submit", editGalleryImage);
}
