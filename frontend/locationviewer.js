// MAP
const map = L.map('map').setView([13.14, 123.76], 6);

L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

let marker = null;
let currentResult = null;

/* =======================
   TOURIST SPOTS DATA
======================= */
const touristSpots = [
  { name: "Intramuros", lat: 14.5896, lon: 120.9756 },
  { name: "Rizal Park", lat: 14.5825, lon: 120.9780 },
  { name: "Boracay", lat: 11.9674, lon: 121.9248 },
  { name: "Chocolate Hills", lat: 9.8297, lon: 124.1450 },
  { name: "Mayon Volcano", lat: 13.2578, lon: 123.6850 }
];

/* =======================
   MODE SWITCH
======================= */
let mode = "places";

const modePlaces = document.getElementById("mode-places");
const modeTourist = document.getElementById("mode-tourist");

const searchSection = document.querySelector(".search-section");
const touristSection = document.getElementById("tourist-section");

modePlaces.onclick = () => {
  mode = "places";
  searchSection.style.display = "block";
  touristSection.classList.add("hidden");
  modePlaces.classList.add("active");
  modeTourist.classList.remove("active");
};

modeTourist.onclick = () => {
  mode = "tourist";
  searchSection.style.display = "none";
  touristSection.classList.remove("hidden");
  modeTourist.classList.add("active");
  modePlaces.classList.remove("active");
  renderTourist();
};

/* =======================
   SEARCH PLACES
======================= */
document.getElementById("search-btn").onclick = async () => {
  const q = document.getElementById("search-input").value;
  if (q.length < 3) return;

  const res = await fetch(`https://nominatim.openstreetmap.org/search.php?format=json&limit=5&q=${encodeURIComponent(q)}`)
  ;

  const data = await res.json();
  showResults(data);
};

function showResults(data) {
  const box = document.getElementById("search-results");
  box.innerHTML = "";
  box.classList.remove("hidden");

  data.forEach(place => {
    const div = document.createElement("div");
    div.className = "result-item";
    div.textContent = place.display_name;

    div.onclick = () => selectPlace(place);
    box.appendChild(div);
  });
}

function selectPlace(place) {
  const lat = +place.lat;
  const lon = +place.lon;

  map.flyTo([lat, lon], 14);

  if (marker) map.removeLayer(marker);
  marker = L.marker([lat, lon]).addTo(map);

  currentResult = place;

  document.getElementById("info-name").textContent =
    place.display_name.split(",")[0];

  document.getElementById("info-address").textContent =
    place.display_name;

  document.getElementById("info-coords").textContent =
    `${lat}, ${lon}`;

  document.getElementById("maps-link").href =
    `https://www.google.com/maps?q=${lat},${lon}`;

  document.getElementById("info-panel").classList.remove("hidden");
}

/* =======================
   TOURIST SPOTS
======================= */
function renderTourist() {
  const list = document.getElementById("tourist-list");
  list.innerHTML = "";

  touristSpots.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.name;

    li.onclick = () => {
      map.flyTo([p.lat, p.lon], 12);

      if (marker) map.removeLayer(marker);
      marker = L.marker([p.lat, p.lon]).addTo(map);

      document.getElementById("info-name").textContent = p.name;
      document.getElementById("info-address").textContent =
        "Famous Tourist Spot";

      document.getElementById("info-coords").textContent =
        `${p.lat}, ${p.lon}`;

      document.getElementById("info-panel").classList.remove("hidden");
    };

    list.appendChild(li);
  });
}

/* =======================
   LOCATE USER
======================= */
document.getElementById("locate-btn").onclick = () => {
  map.locate({ setView: true, maxZoom: 15 });
};

map.on("locationfound", e => {
  if (marker) map.removeLayer(marker);

  marker = L.marker(e.latlng)
    .addTo(map)
    .bindPopup("You are here")
    .openPopup();
});

/* =======================
   INFO PANEL CLOSE
======================= */
document.getElementById("info-close").onclick = () => {
  document.getElementById("info-panel").classList.add("hidden");
};