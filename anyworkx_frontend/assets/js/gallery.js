const galleryParent = document.querySelector(".gallery--grid");
const galleryTable = document.getElementById("images-table-body");
const loadingOverlay = document.getElementById("loading-overlay");
const editImageForm = document.getElementById("edit-image");
const deleteButtons = document.querySelectorAll(".delete");
const deleteModal = document.querySelector("#delete-job-modal");
const modalOverlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn--cancel");
const deleteModalBtn = document.querySelector(".btn--delete");
const noImageDisplay = document.querySelector(".no-image");
const skeletonLoader = document.querySelector(".image-skeleton-loader");

const imageForm = document.getElementById("create-image");
const videoForm = document.getElementById("create-video");

const apiBaseUrl = "https://anyworkx.onrender.com/api/";

function showResponseMessage(message, isSuccess) {
  const alertMessage = document.querySelector("#response-message");
  alertMessage.classList.add(
    isSuccess ? "response--success-message" : "response--error-message"
  );
  alertMessage.textContent = message;
  setTimeout(() => {
    alertMessage.style.display = "none";
  }, 7000);
}

const getGalleryImages = function () {
  const getUrl = `${apiBaseUrl}upload`;
  if (loadingOverlay) {
    loadingOverlay.classList.add("active");
  }

  fetch(getUrl)
    .then((response) => response.json())
    .then((images) => {
      console.log(images);
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
        if (images.total === 0) {
          noImageDisplay.classList.remove("hidden");
          skeletonLoader.style.display = "none";
        } else {
          galleryParent.innerHTML = output;
        }
      }
      if (galleryTable) {
        galleryTable.innerHTML = tableOutput;
      }
    })
    .catch((error) => {
      loadingOverlay.classList.remove("active");
      showResponseMessage(
        "Something went wrong, please refresh and try again",
        false
      );
      console.log(error);
    });
};

if (galleryParent || galleryTable) {
  getGalleryImages();
}

function uploadFile(
  fileInputId,
  descriptionInputId,
  apiEndpoint,
  objectKey,
  successMessage
) {
  const fileForm = document.getElementById(fileInputId);
  const fileInput = document.getElementById(fileInputId);
  const description = document.getElementById(descriptionInputId).value;

  loadingOverlay.classList.add("active");
  const postUrl = `${apiBaseUrl}${apiEndpoint}`;

  const formData = new FormData();
  if (fileInput.files.length > 0) {
    formData.append(`${objectKey}`, fileInput.files[0]);
  } else {
    console.error("Please select a file to upload");
    return;
  }
  formData.append("description", description);

  fetch(postUrl, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      showResponseMessage(successMessage, true);
      window.location.href = `manage-gallery.html`;
    })
    .catch((error) => {
      loadingOverlay.classList.remove("active");
      showResponseMessage("Something went wrong, please try again", false);
      console.log(error);
    });
}

if (imageForm) {
  imageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    uploadFile(
      "image-field",
      "img-description",
      "upload/",
      "image",
      "Image added successfully"
    );
  });
}

// if (videoForm) {
//   videoForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     uploadFile(
//       "video-field",
//       "video-description",
//       "upload/video",
//       "Video uploaded successfully"
//     );
//   });
// }

/*=======SCRIPT FOR UPDATING IMAGE=======*/
const urlParams = new URLSearchParams(window.location.search);
const imageId = urlParams.get("imageId");

const populateEditField = function (imageId) {
  loadingOverlay.classList.add("active");
  const imageDescription = document.getElementById("img-description");
  const editImageUrl = `${apiBaseUrl}upload/${imageId}/`;
  fetch(editImageUrl)
    .then((response) => response.json())
    .then((imageData) => {
      imageDescription.value = imageData.payload.description;
      loadingOverlay.classList.remove("active");
    })
    .catch((error) => {
      loadingOverlay.classList.remove("active");
      showResponseMessage("Unable to populate field", false);
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

  loadingOverlay.classList.add("active");

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
    .then((data) => {
      showResponseMessage("Image updated successfully", true);
      window.location.href = `manage-gallery.html`;
      console.log(data);
    })
    .catch((error) => {
      loadingOverlay.classList.remove("active");
      showResponseMessage("Something went wrong, please try again", false);
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

if (galleryTable) {
  galleryTable.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      const clickedDeleteBtn = e.target;
      const imageId = clickedDeleteBtn.dataset.id;
      showModal(imageId);
    }
  });

  closeModalBtn.addEventListener("click", closeModal);
}

const deleteGalleryImage = function () {
  loadingOverlay.classList.add("active");
  const imageId = deleteModalBtn.dataset.id;
  const deleteImageUrl = `${apiBaseUrl}upload/${imageId}/`;

  fetch(deleteImageUrl, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status === 204) {
        return {};
      }
    })
    .then((data) => {
      showResponseMessage("Image deleted successfully", true);
      closeModal();
      getGalleryImages();
      loadingOverlay.classList.remove("active");
    })
    .catch((error) => {
      loadingOverlay.classList.remove("active");
      showResponseMessage(
        "Unable to delete image, please refresh and try again",
        false
      );
      console.log(error);
    });
};

if (deleteModalBtn) {
  deleteModalBtn.addEventListener("click", deleteGalleryImage);
}
