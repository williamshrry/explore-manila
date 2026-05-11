const mainImage = document.getElementById("mainImage");
const imageWrapper = document.getElementById("imageWrapper");

const photoTitle = document.getElementById("photoTitle");
const photoMeta = document.getElementById("photoMeta");

const orbitUI = document.getElementById("orbitUI");
const orbitMap = document.getElementById("orbitMap");
const sectorHighlight = document.getElementById("sectorHighlight");

const orbitNodesContainer = document.getElementById("orbitNodes");

let currentIndex = 0;

/* IMAGE ZOOM/PAN */
let scale = 1;
let posX = 0;
let posY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

/* ORBIT */
let rotation = 0;
let draggingOrbit = false;
let lastMouseX = 0;

/* LOAD PHOTO */
function loadPhoto(index) {

  currentIndex = index;
  const photo = photos[index];

  mainImage.src = photo.image;

  photoTitle.textContent = photo.title;
  photoMeta.textContent =
    `Angle: ${photo.orbitAngle}°`;

  resetImageTransform();
  updateOrbit(photo.orbitAngle);
  updateActiveNode();
}

/* IMAGE TRANSFORM */
function updateTransform() {
  imageWrapper.style.transform =
    `translate(${posX}px, ${posY}px) scale(${scale})`;
}

function resetImageTransform() {
  scale = 1;
  posX = 0;
  posY = 0;
  updateTransform();
}

/* PAN IMAGE */
imageWrapper.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX - posX;
  startY = e.clientY - posY;
});

window.addEventListener("mouseup", () => isDragging = false);

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  posX = e.clientX - startX;
  posY = e.clientY - startY;
  updateTransform();
});

/* ZOOM IMAGE */
orbitUI.addEventListener("wheel", (e) => {
  e.preventDefault();
  scale += e.deltaY < 0 ? 0.1 : -0.1;
  scale = Math.max(1, Math.min(4, scale));
  updateTransform();
});

/* ORBIT ROTATION */
orbitUI.addEventListener("mousedown", (e) => {
  draggingOrbit = true;
  lastMouseX = e.clientX;
});

window.addEventListener("mouseup", () => draggingOrbit = false);

window.addEventListener("mousemove", (e) => {
  if (!draggingOrbit) return;

  const delta = e.clientX - lastMouseX;
  lastMouseX = e.clientX;

  rotation += delta * 0.5;

  orbitMap.style.transform = `rotate(${rotation}deg)`;
  sectorHighlight.style.transform = `rotate(${rotation}deg)`;
});

/* ORBIT UI GENERATION */
function createNodes() {

  orbitNodesContainer.innerHTML = "";

  photos.forEach((p, i) => {

    const node = document.createElement("div");
    node.className = "orbitNode";

    const angle = (p.orbitAngle - 90) * Math.PI / 180;
    const r = 70;

    node.style.left = `${Math.cos(angle)*r + 90}px`;
    node.style.top = `${Math.sin(angle)*r + 90}px`;

    node.onclick = () => loadPhoto(i);

    orbitNodesContainer.appendChild(node);
  });
}

function updateActiveNode() {
  document.querySelectorAll(".orbitNode")
    .forEach((n, i) => {
      n.classList.toggle("active", i === currentIndex);
    });
}

function updateOrbit(angle) {
  rotation = -angle;
  orbitMap.style.transform = `rotate(${rotation}deg)`;
  sectorHighlight.style.transform = `rotate(${rotation}deg)`;
}

/* NAVIGATION */
document.getElementById("leftBtn").onclick = () => {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  loadPhoto(currentIndex);
};

document.getElementById("rightBtn").onclick = () => {
  currentIndex = (currentIndex + 1) % photos.length;
  loadPhoto(currentIndex);
};

/* INIT */
createNodes();
loadPhoto(0);
