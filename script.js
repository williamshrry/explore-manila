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
    angle: 130,
    distance: 240,
    elevation: 170,
  },

  {
    id: 2,
    title: "View 2",
    image: "images/img2.jpg",
    angle: 100,
    distance: 280,
    elevation: 80
  },

  {
    id: 3,
    title: "View 3",
    image: "images/img3.jpg",
    angle: 55,
    distance: 320,
    elevation: 170
  },

  {
    id: 4,
    title: "View 4",
    image: "images/img4.jpg",
    angle: 320,
    distance: 250,
    elevation: 120
  },

  {
    id: 5,
    title: "View 5",
    image: "images/img5.jpg",
    angle: 285,
    distance: 330,
    elevation: 170
  },

  {
    id: 6,
    title: "View 6",
    image: "images/img6.jpg",
    angle: 270,
    distance: 330,
    elevation: 120
  },

  {
    id: 7,
    title: "View 7",
    image: "images/img7.jpg",
    angle: 230,
    distance: 280,
    elevation: 120
  },

  {
    id: 8,
    title: "View 8",
    image: "images/img8.jpg",
    angle: 185,
    distance: 170,
    elevation: 120
  },

  {
    id: 9,
    title: "View 9",
    image: "images/img9.jpg",
    angle: 210,
    distance: 120,
    elevation: 160
  },

  {
    id: 10,
    title: "View 10",
    image: "images/img10.jpg",
    angle: 140,
    distance: 12,
    elevation: 10
  },

  {
    id: 30,
    title: "View 30",
    image: "images/img30.jpg",
    angle: 215,
    distance: 45,
    elevation: 10
  },

  {
    id: 11,
    title: "View 11",
    image: "images/img11.jpg",
    angle: 215,
    distance: 68,
    elevation: 10
  },

  {
    id: 12,
    title: "View 12",
    image: "images/img12.jpg",
    angle: 250,
    distance: 30,
    elevation: 10
  },

  {
    id: 13,
    title: "View 13",
    image: "images/img13.jpg",
    angle: 295,
    distance: 80,
    elevation: 10
  },

  {
    id: 31,
    title: "View 31",
    image: "images/img31.jpg",
    angle: 257,
    distance: 140,
    elevation: 10
  },

  {
    id: 14,
    title: "View 14",
    image: "images/img14.jpg",
    angle: 278,
    distance: 210,
    elevation: 10
  },

  {
    id: 15,
    title: "View 15",
    image: "images/img15.jpg",
    angle: 300,
    distance: 180,
    elevation: 50
  },

  {
    id: 16,
    title: "View 16",
    image: "images/img16.jpg",
    angle: 310,
    distance: 97,
    elevation: 10
  },

  {
    id: 17,
    title: "View 17",
    image: "images/img17.jpg",
    angle: 318,
    distance: 124,
    elevation: 10
  },

  {
    id: 18,
    title: "View 18",
    image: "images/img18.jpg",
    angle: 322,
    distance: 162,
    elevation: 10
  },

  {
    id: 19,
    title: "View 19",
    image: "images/img19.jpg",
    angle: 325,
    distance: 150,
    elevation: 10
  },

  {
    id: 20,
    title: "View 20",
    image: "images/img20.jpg",
    angle: 335,
    distance: 147,
    elevation: 10
  },

   {
    id: 32,
    title: "View 32",
    image: "images/img32.jpg",
    angle: 368,
    distance: 148,
    elevation: 10
  },

  {
    id: 21,
    title: "View 21",
    image: "images/img21.jpg",
    angle: 360,
    distance: 148,
    elevation: 10
  },

  {
    id: 22,
    title: "View 22",
    image: "images/img22.jpg",
    angle: 15,
    distance: 187,
    elevation: 10
  },

  {
    id: 23,
    title: "View 23",
    image: "images/img23.jpg",
    angle: 38,
    distance: 240,
    elevation: 10
  },

  {
    id: 24,
    title: "View 24",
    image: "images/img24.jpg",
    angle: 50,
    distance: 200,
    elevation: 10
  },

  {
    id: 25,
    title: "View 25",
    image: "images/img25.jpg",
    angle: 50,
    distance: 243,
    elevation: 10
  },

  {
    id: 26,
    title: "View 26",
    image: "images/img26.jpg",
    angle: 65,
    distance: 297,
    elevation: 10
  },

  {
    id: 27,
    title: "View 27",
    image: "images/img27.jpg",
    angle: 70,
    distance: 300,
    elevation: 10
  },

  {
    id: 28,
    title: "View 28",
    image: "images/img28.jpg",
    angle: 60,
    distance: 210,
    elevation: 70
  },

  {
    id: 29,
    title: "View 29",
    image: "images/img29.jpg",
    angle: 70,
    distance: 140,
    elevation: 10
  },
];

/* =========================
STATE
========================= */

let currentIndex = 0;

const mainImage =
  document.getElementById("main-image");

const nodeLayer =
  document.getElementById("node-layer");

/* =========================
CREATE NODES (NO CONES)
========================= */

function createNodes() {

  nodeLayer.innerHTML = "";

  const centerX = 50;
  const centerY = 50;

  photoNodes.forEach((node, index) => {

    const angleRad =
      (node.angle - 90) * Math.PI / 180;

    const orbitRadius =
      node.distance * 0.15;

    const x =
      centerX + Math.cos(angleRad) * orbitRadius;

    const y =
      centerY + Math.sin(angleRad) * orbitRadius;

    const div =
      document.createElement("div");

    div.classList.add("orbit-node");

    if(index === currentIndex) {
      div.classList.add("active");
    }

    const size =
      10 + (node.elevation * 0.05);

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

    mainImage.src =
      photoNodes[index].image;

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
MAIN IMAGE PAN + ZOOM
========================= */

const imageWrapper =
  document.getElementById("image-wrapper");

const panzoom =
  Panzoom(mainImage, {

    maxScale: 6,
    minScale: 1,

    contain: "outside",

    step: 0.15
  });

imageWrapper.addEventListener(
  "wheel",
  panzoom.zoomWithWheel
);

/* =========================
MAP ZOOM + PAN (FIXED)
========================= */

const mapContainer =
  document.getElementById("map-container");

const mapContent =
  document.getElementById("map-content");

let mapScale = 1;

let mapX = 0;
let mapY = 0;

let isDragging = false;
let startX = 0;
let startY = 0;

/* UPDATE TRANSFORM */

function updateMap() {
  mapContent.style.transform =
    `translate(${mapX}px, ${mapY}px) scale(${mapScale})`;
}

/* CLAMP MOVEMENT */

function clampMap() {

  if(mapScale <= 1) {
    mapX = 0;
    mapY = 0;
    return;
  }

  const rect =
    mapContainer.getBoundingClientRect();

  const maxX =
    ((rect.width * mapScale) - rect.width) / 2;

  const maxY =
    ((rect.height * mapScale) - rect.height) / 2;

  mapX =
    Math.max(-maxX, Math.min(maxX, mapX));

  mapY =
    Math.max(-maxY, Math.min(maxY, mapY));
}

/* ZOOM */

mapContainer.addEventListener("wheel", (e) => {

  e.preventDefault();

  const zoomSpeed = 0.12;

  if(e.deltaY < 0) {
    mapScale += zoomSpeed;
  } else {
    mapScale -= zoomSpeed;
  }

  mapScale =
    Math.max(1, Math.min(mapScale, 4));

  clampMap();
  updateMap();

}, { passive: false });

/* DRAG START */

mapContainer.addEventListener("mousedown", (e) => {

  if(mapScale <= 1) return;

  isDragging = true;

  startX = e.clientX - mapX;
  startY = e.clientY - mapY;

});

/* DRAG MOVE */

window.addEventListener("mousemove", (e) => {

  if(!isDragging) return;

  mapX = e.clientX - startX;
  mapY = e.clientY - startY;

  clampMap();
  updateMap();

});

/* DRAG END */

window.addEventListener("mouseup", () => {
  isDragging = false;
});

/* =========================
KEYBOARD NAV
========================= */

window.addEventListener("keydown", (e) => {

  if(e.key === "ArrowRight") nextImage();
  if(e.key === "ArrowLeft") prevImage();

});
/* =========================
INIT
========================= */

createNodes();
