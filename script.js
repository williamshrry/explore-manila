/* =========================
FILE: script.js
========================= */

const mainImage = document.getElementById("mainImage");

const photoTitle = document.getElementById("photoTitle");
const photoMeta = document.getElementById("photoMeta");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

const orbitNodesContainer = document.getElementById("orbitNodes");

let currentIndex = 0;

/* =========================
LOAD IMAGE
========================= */

function loadPhoto(index) {

  currentIndex = index;

  const photo = photos[index];

  mainImage.classList.add("fadeOut");

  setTimeout(() => {

    mainImage.src = photo.image;

    photoTitle.textContent = photo.title;

    photoMeta.innerHTML = `
      Orbit Angle: ${photo.orbitAngle}°
      &nbsp; • &nbsp;
      Elevation: ${photo.elevation}°
      &nbsp; • &nbsp;
      Distance: ${photo.distance}
    `;

    mainImage.onload = () => {
      mainImage.classList.remove("fadeOut");
    };

    updateOrbitUI();

  }, 400);
}

/* =========================
ORBIT UI
========================= */

function createOrbitNodes() {

  orbitNodesContainer.innerHTML = "";

  const radius = 75;

  photos.forEach((photo, index) => {

    const node = document.createElement("div");

    node.classList.add("orbitNode");

    const angleRad =
      (photo.orbitAngle - 90) * (Math.PI / 180);

    const x =
      Math.cos(angleRad) * radius + 90;

    const y =
      Math.sin(angleRad) * radius + 90;

    node.style.left = `${x}px`;
    node.style.top = `${y}px`;

    node.addEventListener("click", () => {
      loadPhoto(index);
    });

    orbitNodesContainer.appendChild(node);

  });

  updateOrbitUI();
}

function updateOrbitUI() {

  const nodes =
    document.querySelectorAll(".orbitNode");

  nodes.forEach((node, i) => {

    node.classList.remove("active");

    if (i === currentIndex) {
      node.classList.add("active");
    }

  });
}

/* =========================
NAVIGATION
========================= */

function nextPhoto() {

  currentIndex++;

  if (currentIndex >= photos.length) {
    currentIndex = 0;
  }

  loadPhoto(currentIndex);
}

function prevPhoto() {

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = photos.length - 1;
  }

  loadPhoto(currentIndex);
}

/* BUTTONS */

rightBtn.addEventListener("click", nextPhoto);
leftBtn.addEventListener("click", prevPhoto);

/* KEYBOARD */

document.addEventListener("keydown", (e) => {

  if (e.key === "ArrowRight") {
    nextPhoto();
  }

  if (e.key === "ArrowLeft") {
    prevPhoto();
  }

});

/* =========================
INIT
========================= */

createOrbitNodes();
loadPhoto(0);
