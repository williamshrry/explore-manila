const mainImage = document.getElementById("mainImage");
const imageWrapper = document.getElementById("imageWrapper");

const orbitUI = document.getElementById("orbitUI");
const orbitMapWrapper = document.getElementById("orbitMapWrapper");
const orbitPins = document.getElementById("orbitPins");
const sectorHighlight = document.getElementById("sectorHighlight");

/* =========================
IMAGE STATE
========================= */

let imgScale = 1;
let imgX = 0;
let imgY = 0;

let isDragging = false;
let startX = 0;
let startY = 0;

/* inertia */
let velX = 0;
let velY = 0;

/* =========================
ORBIT STATE
========================= */

let rotation = 0;
let orbitScale = 1;

let draggingOrbit = false;
let lastX = 0;

/* =========================
IMAGE DRAG + VELOCITY
========================= */

imageWrapper.addEventListener("mousedown", (e) => {
  isDragging = true;

  startX = e.clientX - imgX;
  startY = e.clientY - imgY;

  velX = 0;
  velY = 0;
});

window.addEventListener("mousemove", (e) => {

  if (!isDragging) return;

  const newX = e.clientX - startX;
  const newY = e.clientY - startY;

  velX = newX - imgX;
  velY = newY - imgY;

  imgX = newX;
  imgY = newY;

  updateImage();
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  inertia();
});

/* =========================
INERTIA
========================= */

function inertia() {

  if (Math.abs(velX) < 0.1 && Math.abs(velY) < 0.1) return;

  velX *= 0.92;
  velY *= 0.92;

  imgX += velX;
  imgY += velY;

  updateImage();

  requestAnimationFrame(inertia);
}

/* =========================
ZOOM TO CURSOR
========================= */

document.getElementById("imageContainer").addEventListener("wheel", (e) => {

  e.preventDefault();

  const rect = imageWrapper.getBoundingClientRect();

  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const prev = imgScale;

  imgScale += e.deltaY < 0 ? 0.12 : -0.12;
  imgScale = Math.max(1, Math.min(5, imgScale));

  const factor = imgScale / prev;

  imgX = mouseX - (mouseX - imgX) * factor;
  imgY = mouseY - (mouseY - imgY) * factor;

  updateImage();

}, { passive: false });

function updateImage() {
  imageWrapper.style.transform =
    `translate(${imgX}px, ${imgY}px) scale(${imgScale})`;
}

/* =========================
ORBIT ROTATION
========================= */

orbitUI.addEventListener("mousedown", (e) => {
  draggingOrbit = true;
  lastX = e.clientX;
});

window.addEventListener("mouseup", () => draggingOrbit = false);

window.addEventListener("mousemove", (e) => {

  if (!draggingOrbit) return;

  const dx = e.clientX - lastX;
  lastX = e.clientX;

  rotation += dx * 0.4;

  orbitMapWrapper.style.transform =
    `rotate(${rotation}deg) scale(${orbitScale})`;

  orbitPins.style.transform =
    `rotate(${rotation}deg) scale(${orbitScale})`;

  sectorHighlight.style.transform =
    `rotate(${rotation}deg)`;

});

/* =========================
ORBIT ZOOM
========================= */

orbitUI.addEventListener("wheel", (e) => {

  e.preventDefault();

  orbitScale += e.deltaY < 0 ? 0.1 : -0.1;
  orbitScale = Math.max(1, Math.min(2, orbitScale));

  orbitMapWrapper.style.transform =
    `rotate(${rotation}deg) scale(${orbitScale})`;

  orbitPins.style.transform =
    `rotate(${rotation}deg) scale(${orbitScale})`;

}, { passive: false });

/* =========================
LOAD IMAGE
========================= */

function loadImage(i) {
  mainImage.src = photos[i].image;
}

loadImage(0);

/* =========================
PINS (ANGLE + DISTANCE)
========================= */

function createPins() {

  orbitPins.innerHTML = "";

  photos.forEach(p => {

    const pin = document.createElement("div");
    pin.className = "orbitPin";

    const angle = (p.orbitAngle - 90) * Math.PI / 180;

    const r = p.orbitRadius;

    const cx = 100;
    const cy = 100;

    pin.style.left = `${Math.cos(angle) * r + cx}px`;
    pin.style.top = `${Math.sin(angle) * r + cy}px`;

    orbitPins.appendChild(pin);
  });
}

createPins();
