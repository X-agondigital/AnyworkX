const galleryParent = document.querySelector(".gallery--grid");
const galleryTable = document.getElementById("images-table-body");
const loadingOverlay = document.getElementById("loading-overlay");
const editImageForm = document.getElementById("edit-image");
const deleteButtons = document.querySelectorAll(".delete");
const deleteModal = document.querySelector("#delete-job-modal");
const modalOverlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn--cancel");
const deleteModalBtn = document.querySelector(".btn--delete");

const apiBaseUrl = "https://anyworkx.onrender.com/api/";

function displayErrorMessage(errorMessage) {
  const alertMessage = document.querySelector("#response-message");
  alertMessage.classList.add("response--error-message");
  alertMessage.textContent = errorMessage;
  loadingOverlay.classList.remove("active");
}

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
    .catch((error) => {
      displayErrorMessage("Something went wrong, please refresh the page")
      console.log(error);
    })
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
        displayErrorMessage("Something went wrong, please try again")
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
    .catch((error) => {
      displayErrorMessage("Unable to populate field")
      console.log(error);
    });
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
    .catch((error) => {
      displayErrorMessage("Something went wrong, please try again")
    });
};

if (editImageForm) {
  editImageForm.addEventListener("submit", editGalleryImage);
}

/*=======SCRIPT FOR DELETING IMAGE=======*/
const showModal = function (imageId) {
  deleteModal.classList.remove("hidden");
  deleteModalBtn.setAttribute("data-id", imageId);
};

const closeModal = function () {
  deleteModal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
};

galleryTable.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    const clickedDeleteBtn = e.target;
    const imageId = clickedDeleteBtn.dataset.id;
    showModal(imageId);
  }
});

closeModalBtn.addEventListener("click", closeModal);

const deleteGalleryImage = function () {
  const imageId = deleteModalBtn.dataset.id;
  const deleteImageUrl = `${apiBaseUrl}upload/${imageId}/`;

  fetch(deleteImageUrl, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      displayErrorMessage("Unable to delete image, please refresh and try again")
    });
};

deleteModalBtn.addEventListener("click", deleteGalleryImage);
