import { renderPhotoRow } from "../components.js";
import { initReveal } from "../motion.js";

export function init() {
  const fjPhotos = [
    {
      src: "/assets/images/fj13/fj13-briggs-creek.jpg",
      alt: "FJ13 at Briggs Creek.",
      caption: "FJ13 at Briggs Creek",
    },
    {
      src: "/assets/images/fj13/fj13-lassen.jpg",
      alt: "FJ13 at Lassen Volcanic.",
      caption: "FJ13 at Lassen Volcanic",
    },
    {
      src: "/assets/images/fj13/fj13-night-lights.jpg",
      alt: "FJ13's night-lighting setup.",
      caption: "FJ13's Night Lights",
    },
  ];

  const travelPhotos = [
    {
      src: "/assets/images/travel/yeti-10oz-mug-briggs.jpg",
      alt: "Coffee setup at Briggs.",
      caption: "Coffee at Briggs",
    },
    {
      src: "/assets/images/travel/emerald-lake-lvnp.jpg",
      alt: "Emerald Lake at sunrise.",
      caption: "Emerald Lake",
    },
    {
      src: "/assets/images/travel/mt-hood-national-forest.jpg",
      alt: "Mount Hood National Forest.",
      caption: "Mt. Hood NF",
    },
    {
      src: "/assets/images/travel/lake-helen-lvnp.jpg",
      alt: "Lake Helen basin.",
      caption: "Lake Helen",
    },
  ];

  const supportPhotos = [
    {
      src: "/assets/images/travel/hug-point-oregon.jpg",
      alt: "Hug Point arch on the Oregon coast.",
      caption: "Hug Point",
    },
    {
      src: "/assets/images/travel/ENO-onelink-lake-tahoe.jpg",
      alt: "Overlook at Lake Tahoe.",
      caption: "Lake Tahoe",
    },
    {
      src: "/assets/images/travel/valentine-cave-lava-tube.jpg",
      alt: "Skylight inside a lava tube.",
      caption: "Lava Tube",
    },
    {
      src: "/assets/images/travel/cape-meares-lighthouse-oregon.jpg",
      alt: "Cape Meares lighthouse view.",
      caption: "Cape Meares",
    },
  ];

  const map = {
    "[data-photo-fj]": fjPhotos,
    "[data-photo-travel]": travelPhotos,
    "[data-photo-support]": supportPhotos,
  };

  for (const [sel, photos] of Object.entries(map)) {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = renderPhotoRow(photos);
  }
  initReveal();
}
