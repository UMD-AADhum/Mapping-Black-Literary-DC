console.log("map-view.js connected")
console.log(geoJSON);
console.log(geoJSON.features);

// >>>>> LEAFLET.JS MAP 

// *1 - grab map div from DOM
pageMap = document.getElementById("map");

// *2 - create map & set main view center 
// ^ current center: Logan Circle | latitude = 38.909142, longitude -77.029793
map = L.map(pageMap).setView({lon: -77.029793, lat: 38.909142}, 14.5);

// *3 - add map tile
// tile: toner, stamen maps
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
}).addTo(map);

// *4 - show scale bar on the lower left corner
L.control.scale({imperial: true, metric: true}).addTo(map);

// *5 - add map points: loop through mapPoints array to add map points to leaflet map
/*  for (let index = 0; index < mapPoints.length; index++) {
    // a. store mapPoints data in variable
    let lat = mapPoints[index][2];
    let lon = mapPoints[index][3];
    let popup = mapPoints[index][0] + "<br>" + "Address: " + mapPoints[index][1];
    
    // b. create map marker from var data
    let pointLoc = new L.LatLng(lat, lon);
    let pointMarker = new L.Marker(pointLoc);
    
    // c. add marker to DOM map
    map.addLayer(pointMarker);
    pointMarker.bindPopup(popup);
}; */

// geoJSON
// L.geoJSON(geoJSON).addTo(map);

// let pointsLayer = L.geoJSON().addTo(map);
// pointsLayer.addData(geoJSON.features);


for (let index = 0; index < geoJSON.features.length; index++) {
    L.geoJSON(geoJSON.features[index]).addTo(map); 
};

// >>>>> LEAFLET MAP OVERLAY

let wmataOverImg = "./media/imgs/wmata-map-495.png"
let errorOverlayImg = "https://cdn-icons-png.flaticon.com/512/110/110686.png";
let wmataOverBounds = L.latLngBounds([[39.028492, -77.233734], [38.768111, -76.844407]])

let imageOverlay = L.imageOverlay(wmataOverImg , wmataOverBounds, {
    errorOverlayUrl: errorOverlayImg,
    opacity: .5,
    interactive: true
}).addTo(map);


// OpenStreetMap tile
/* L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map); */