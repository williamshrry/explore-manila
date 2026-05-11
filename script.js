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

let draggingImg = false;
let startX = 0;
let startY = 0;

/* =========================
ORBIT STATE
========================= */

let rotation = 0;
let orbitScale = 1;

let draggingOrbit = false;
let lastX = 0;

/* =========================
IMAGE PAN
========================= */

imageWrapper.addEventListener("mousedown", (e) => {
  draggingImg = true;
  startX = e.clientX - imgX;
  startY = e.clientY - imgY;
});

window.addEventListener("mouseup", () => draggingImg = false);

window.addEventListener("mousemove", (e) => {

  if (!draggingImg) return;

  imgX = e.clientX - startX;
  imgY = e.clientY - startY;

  imageWrapper.style.transform =
    `translate(${imgX}px, ${imgY}px) scale(${imgScale})`;
});

/* =========================
IMAGE ZOOM
========================= */

orbitUI.addEventListener("wheel", (e) => {

  e.preventDefault();

  imgScale += e.deltaY < 0 ? 0.1 : -0.1;
  imgScale = Math.max(1, Math.min(4, imgScale));

  imageWrapper.style.transform =
    `translate(${imgX}px, ${imgY}px) scale(${imgScale})`;

}, { passive: false });

/* =========================
ORBIT ROTATION (DRAG)
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
CREATE PINS (ANGLE + DISTANCE)
========================= */

function createPins() {

  orbitPins.innerHTML = "";

  photos.forEach(p => {

    const pin = document.createElement("div");
    pin.className = "orbitPin";

    const angle = (p.orbitAngle - 90) * Math.PI / 180;

    const r = p.orbitRadius;

    const center = 100;

    const x = Math.cos(angle) * r + center;
    const y = Math.sin(angle) * r + center;

    pin.style.left = `${x}px`;
    pin.style.top = `${y}px`;

    orbitPins.appendChild(pin);
  });
}

createPins();
