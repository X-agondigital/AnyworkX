const galleryParent = document.querySelector(".gallery--grid");
const galleryImageTable = document.getElementById("images-table-body");
const galleryVideoTable = document.getElementById("video-table-body");
const loadingOverlay = document.getElementById("loading-overlay");
const editImageForm = document.getElementById("edit-image");
const editVideoForm = document.getElementById("edit-video");
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
      if (galleryImageTable) {
        galleryImageTable.innerHTML = tableOutput;
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

if (galleryParent || galleryImageTable) {
  getGalleryImages();
}

const getGalleryVideos = function () {
  const getUrl = `${apiBaseUrl}videos/`;
  if (loadingOverlay) {
    loadingOverlay.classList.add("active");
  }

  fetch(getUrl)
    .then((response) => response.json())
    .then((videos) => {

      if (loadingOverlay) {
        loadingOverlay.classList.remove("active");
      }

      let videoTableOutput = "";

      videos.forEach((video) => {
        const videoId = video.id;

        videoTableOutput += `
          <tr>
            <td data-label="video"><video src="${video.video_file}" class="table-img" alt=""></video></td>
            <td data-label="Description">${video.title}</td>
            <td><a href="edit-video.html?videoId=${videoId}" class="edit btn--action" data-id="${videoId}">Edit</a></td>
            <td><a class="delete delete-btn btn--action" data-id="${videoId}">Delete</a></td>
          </tr>
        `;
      });

      galleryVideoTable.innerHTML = videoTableOutput;
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

if (galleryVideoTable) {
  getGalleryVideos();
}

function uploadFile(
  fileInputId,
  descriptionInputId,
  apiEndpoint,
  objectKey,
  fileDescription,
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
  formData.append(`${fileDescription}`, description);

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
      "description",
      "Image added successfully"
    );
  });
}

if (videoForm) {
  videoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    uploadFile(
      "video-field",
      "video-description",
      "videos/",
      "video_file",
      "title",
      "Video uploaded successfully"
    );
  });
}

/*=======SCRIPT FOR UPDATING IMAGE=======*/
const urlParams = new URLSearchParams(window.location.search);
const imageId = urlParams.get("imageId");
const videoId = urlParams.get("videoId"); // Assuming video edit form exists

const populateEditField = function (fileId, apiEndpoint, descriptionInputId, objectKey) {
  loadingOverlay.classList.add("active");
  const description = document.getElementById(descriptionInputId);
  const editFileUrl = `${apiBaseUrl}${apiEndpoint}/${fileId}/`;
  fetch(editFileUrl)
    .then((response) => response.json())
    .then((fileData) => {
      description.value = fileData[objectKey];
      loadingOverlay.classList.remove("active");
    })
    .catch((error) => {
      loadingOverlay.classList.remove("active");
      showResponseMessage("Unable to populate field", false);
      console.log(error);
    });
};

if (editImageForm) {
  populateEditField(imageId, "upload", "img-description", "payload[description]");
}

// Assuming video edit form exists
if (editVideoForm) {
  populateEditField(videoId, "videos", "video-description", "title");
}

const editFile = function (
  e,
  fileType,
  apiEndpoint,
  fileId,
  fileFieldId,
  descriptionFieldId
) {
  e.preventDefault();
  const fileField = document.getElementById(fileFieldId);
  const description = document.getElementById(descriptionFieldId).value;

  loadingOverlay.classList.add("active");

  const uploadUrl = `${apiBaseUrl}${apiEndpoint}/${fileId}/`;

  const formData = new FormData();
  if (fileField.files.length > 0) {
    formData.append(fileType, fileField.files[0]);
  }
  formData.append("description", description);

  fetch(uploadUrl, {
    method: "PATCH",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      showResponseMessage("file updated successfully", true);
      window.location.href = "manage-gallery.html";
      console.log(data);
    })
    .catch((error) => {
      loadingOverlay.classList.remove("active");
      showResponseMessage("Something went wrong, please try again", false);
      console.log(error);
    });
};

if (editImageForm) {
  editImageForm.addEventListener("submit", (e) => {
    editFile(e, "image", "upload", imageId, "image-field", "img-description");
  });
}

if (editVideoForm) {
  editVideoForm.addEventListener("submit", (e) => {
    editFile(e, "video", "videos", videoId, "video-field", "video-description");
  });
}

/*=======SCRIPT FOR DELETING IMAGE=======*/

const showModal = function (apiEndpoint, mediaId, mediaType) {
  console.log("API Endpoint:", apiEndpoint);
  deleteModal.classList.remove("hidden");
  deleteModalBtn.setAttribute("data-endpoint", apiEndpoint);
  deleteModalBtn.setAttribute("data-id", mediaId);
  deleteModalBtn.setAttribute("data-type", mediaType);
};

const closeModal = function () {
  deleteModal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
};

const deleteMedia = function () {
  loadingOverlay.classList.add("active");
  const mediaId = deleteModalBtn.dataset.id;
  const mediaType = deleteModalBtn.dataset.type;
  const apiEndpoint = deleteModalBtn.dataset.endpoint;
  console.log(apiEndpoint, mediaId);
  const deleteUrl = `${apiBaseUrl}${apiEndpoint}/${mediaId}/`;

  fetch(deleteUrl, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status === 204) {
        return {};
      }
    })
    .then((data) => {
      const mediaTypeString = mediaType === "image" ? "Image" : "Video";
      showResponseMessage(`${mediaTypeString} deleted successfully`, true);
      closeModal();
      if (mediaType === "image") {
        getGalleryImages();
      } else {
        getGalleryVideos();
      }
      loadingOverlay.classList.remove("active");
    })
    .catch((error) => {
      loadingOverlay.classList.remove("active");
      showResponseMessage(
        `Unable to delete ${mediaType}, please refresh and try again`,
        false
      );
      console.log(error);
    });
};

if (galleryImageTable) {
  galleryImageTable.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      const clickedDeleteBtn = e.target;
      const apiEndpoint = "upload"; 
      const mediaId = clickedDeleteBtn.dataset.id;
      const mediaType = "image";
      showModal(apiEndpoint, mediaId, mediaType);
    }
    
  });

  closeModalBtn.addEventListener("click", closeModal);
}

if (deleteModalBtn) {
  deleteModalBtn.addEventListener("click", deleteMedia);
}

if (galleryVideoTable) {
  galleryVideoTable.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      const clickedDeleteBtn = e.target;
      const apiEndpoint = "videos";
      const mediaId = clickedDeleteBtn.dataset.id;
      const mediaType = "video";
      showModal(apiEndpoint, mediaId, mediaType);
    }
    
  });
  closeModalBtn.addEventListener("click", closeModal);
}
