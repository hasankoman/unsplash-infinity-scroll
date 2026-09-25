const imageContainer = document.querySelector(".container-photos");
const loaderContainer = document.querySelector(".spinner-container");
const photos = document.querySelector(".photos");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total" + totalImages);
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded());
    item.appendChild(img);
    photos.appendChild(item);
  });
};

// Ubsplash API
const count = 10;
// Anahtar config.js'ten gelir (gitignore'lu). Kurulum: config.example.js -> config.js
const apiKey = window.UNSPLASH_ACCESS_KEY;
if (!apiKey) {
  console.error("UNSPLASH_ACCESS_KEY tanımlı değil: config.example.js dosyasını config.js olarak kopyalayıp anahtarını gir.");
}
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageLoaded = () => {
  imagesLoaded += 1;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    console.log("rdasd");
  }
};

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    console.log("load more");
  }
});

getPhotos();
