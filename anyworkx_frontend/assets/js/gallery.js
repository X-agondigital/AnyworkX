const galleryParent = document.querySelector(".gallery--grid");

const apiBaseUrl = "https://anyworkx.onrender.com/api/";

const getGalleryImages = function () {
  const getUrl = `${apiBaseUrl}upload`;

  fetch(getUrl)
    .then((response) => response.json())
    .then((images) => {
        let output = ``;
        images.data.forEach(image => {
            output += `
            <figure>
            <img src="${image.image}" alt="" />
            <figcaption>
              ${image.description}
            </figcaption>
          </figure>
            `
        });
        galleryParent.innerHTML = output;
        
    })
    .catch((error) => console.log("Error getting images", error));
};

getGalleryImages();

console.log(getUrl);
