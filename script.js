/* =========================
FILE: script.js
========================= */

/* =========================
PHOTO DATABASE
ADD NEW NODES HERE
========================= */

const photoNodes = [

  {
    id: 1,
    title: "View 1",

    image: "images/img1.jpg",

    angle: 150,
    distance: 170,
    elevation: 120
  },

  {
    id: 2,
    title: "View 2",

    image: "images/img2.jpg",

    angle: 110,
    distance: 270,
    elevation: 170
  },

  {
    id: 3,
    title: "View 3",

    image: "images/img3.jpg",

    angle: 50,
    distance: 180,
    elevation: 90
  },

    {
    id: 4,
    title: "View 4",

    image: "images/img4.jpg",

    angle: 185,
    distance: 170,
    elevation: 120
  }

];

/* =========================
STATE
========================= */

let currentIndex = 0;

const mainImage = document.getElementById("main-image");
const nodeLayer = document.getElementById("node-layer");

/* =========================
CREATE MAP NODES
========================= */

function createNodes() {

  nodeLayer.innerHTML = "";

  const centerX = 50;
  const centerY = 50;

  photoNodes.forEach((node, index) => {

    const angleRad = (node.angle - 90) * Math.PI / 180;

    const orbitRadius = node.distance * 0.15;

    const x = centerX + Math.cos(angleRad) * orbitRadius;
    const y = centerY + Math.sin(angleRad) * orbitRadius;

    const div = document.createElement("div");

    div.classList.add("orbit-node");

    if(index === currentIndex) {
      div.classList.add("active");
    }

    /* Elevation affects node size */
    const size = 10 + (node.elevation * 0.05);

    div.style.width = `${size}px`;
    div.style.height = `${size}px`;

    div.style.left = `${x}%`;
    div.style.top = `${y}%`;

    div.title = node.title;

    div.addEventListener("click", () => {
      switchImage(index);
    });

    nodeLayer.appendChild(div);

  });

}

/* =========================
SWITCH IMAGE
========================= */

function switchImage(index) {

  currentIndex = index;

  mainImage.style.opacity = 0;

  mainImage.style.transform = "scale(1.03)";

  setTimeout(() => {

    mainImage.src = photoNodes[index].image;

    mainImage.onload = () => {

      mainImage.style.opacity = 1;

      mainImage.style.transform = "scale(1)";
    };

    createNodes();

  }, 220);

}

/* =========================
LEFT / RIGHT NAVIGATION
========================= */

function nextImage() {

  currentIndex++;

  if(currentIndex >= photoNodes.length) {
    currentIndex = 0;
  }

  switchImage(currentIndex);

}

function prevImage() {

  currentIndex--;

  if(currentIndex < 0) {
    currentIndex = photoNodes.length - 1;
  }

  switchImage(currentIndex);

}

document.getElementById("nextBtn")
  .addEventListener("click", nextImage);

document.getElementById("prevBtn")
  .addEventListener("click", prevImage);

/* =========================
PAN + ZOOM
========================= */

const imageWrapper = document.getElementById("image-wrapper");

const panzoom = Panzoom(mainImage, {

  maxScale: 6,
  minScale: 1,

  contain: "outside",

  step: 0.15
});

imageWrapper.addEventListener("wheel", panzoom.zoomWithWheel);

/* =========================
KEYBOARD SUPPORT
========================= */

window.addEventListener("keydown", (e) => {

  if(e.key === "ArrowRight") {
    nextImage();
  }

  if(e.key === "ArrowLeft") {
    prevImage();
  }

});

/* =========================
INITIALIZE
========================= */

createNodes();
