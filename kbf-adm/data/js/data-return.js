console.log("data-return.js is connected")
// a. script pulls csv data from Google Sheet to json with papa parse
// b. adds json to mbldsGeoJson.js

// = c. return geojson to map as points on map.js page & shows geojson on geojson-view.html

// A - papa parse data return
// * this function returns MBLDC CSV data uploaded via Google Sheets share link as JSON 

// Google Sheets URL
// 1. upload an updated data file to Google Sheets
// 2. click 'File' > 'Share' > 'Publish to the web'
// 3. under 'link' tab, click 'webpage' dropdown and select CSV file from the menu
// 4. copy & paste link below

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


let mbldcGSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTftLVLS-R7Osjh6O60IornfVPoG2MK1TS7HluHkc6DE_uOwdKl75FsZLmPC7pWUcP_XsHiaSYajGmI/pub?gid=397357141&single=true&output=csv ";

let geoJSON = {
    type: "FeatureCollection",
    features: [],
};

Papa.parse(mbldcGSheetURL, {
    download: true,
    header: true,
    complete: showData,
});

function showData(result) {

    let rawData = result.data;
      
    for (let index = 0; index < rawData.length; index++) {
        geoJSON.features.push({
            "type": "Feature",
            
            "geometry": {
                "type": "Point",
                "coordinates": [rawData[index].long, rawData[index].lat]
                },
            
            "properties": {
                "id": rawData[index].venueUID,
                "Venue": rawData[index].venueName,
                "venueType": rawData[index].venueType,
                "Address": rawData[index].address,
                "popupContent": rawData[index].venueName + "<br>" + rawData[index].address + "<br>" + rawData[index].venueType
                }
        });
    };
    console.log(geoJSON);
    L.geoJSON(geoJSON).addTo(map);

};
 

// >>>>> LEAFLET.JS MAP 



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

/*  let pointsLayer = L.geoJSON().addTo(map);

for (let index = 0; index < geoJSON.features.length; index++) {
   // L.geoJSON(geoJSON.features[index]).addTo(map); 
    pointsLayer.addData(geoJSON.features[index]);
}; */

// >>>>> LEAFLET MAP OVERLAY

let wmataOverImg = "./media/imgs/wmata-map-495.png"
let errorOverlayImg = "https://cdn-icons-png.flaticon.com/512/110/110686.png";
let wmataOverBounds = L.latLngBounds([[39.028492, -77.233734], [38.768111, -76.844407]])

let imageOverlay = L.imageOverlay(wmataOverImg , wmataOverBounds, {
    errorOverlayUrl: errorOverlayImg,
    opacity: .5,
    interactive: true
}).addTo(map); 
