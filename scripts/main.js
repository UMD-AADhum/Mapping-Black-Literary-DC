console.log("main.js is connected")

// CREATE LEAFLET.JS MAP
// ### grab map div from DOM
let pageMap = document.getElementById("map");

// ### create map & set main view center 
// >>> current center: African American Civil War Museum (U St NW & Vermont Ave NW) | latitude = 38.916271, longitude -77.025391
let map = L.map(pageMap).setView({lon: -77.025391, lat: 38.916271}, 15.5);

// ADD MAP ELEMENTS
// ### add map tiles
// > tile: stamen toner by stadia maps
/*
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> <a href="https://stamen.com/" target="_blank">&copy; Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    
}).addTo(map);
*/

// > tile: open street map (basic/demo)
let OSM_Tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
map.addLayer(OSM_Tiles);
// .addTo(map);

// ### show scale bar on the lower left corner
L.control.scale({imperial: true, metric: true}).addTo(map);

// ### black map icons
const blackIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// ADD DATA TO MAP
// ### mbldc data sheet URL
let mbldcGSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTftLVLS-R7Osjh6O60IornfVPoG2MK1TS7HluHkc6DE_uOwdKl75FsZLmPC7pWUcP_XsHiaSYajGmI/pub?gid=1259292064&single=true&output=csv";

// ### create geoJSON collection
let geoJSONMap = {
    type: "FeatureCollection",
    features: [],
}; 

// ### papaparse CSV to JSON pull
Papa.parse(mbldcGSheetURL, {
    download: true,
    header: true,
    complete: showData,
});

// ### showData(): JSON to geoJSON to map
function showData(result) {

    let rawData = result.data;

    // >>> push rawData to geoJSON  
    for (let index = 0; index < rawData.length; index++) {
        geoJSONMap.features.push({
            "type": "Feature",

            "geometry": {
                "type": "Point",
                "coordinates": [rawData[index].long, rawData[index].lat],
            },

            "properties": {
                "id": rawData[index].venueUID,
                "venueName": rawData[index].venueName,
                "venueType": rawData[index].venueType,
                "category": rawData[index].category,
                "address": rawData[index].address,
                "popupContent": rawData[index].venueName + "<br>" + rawData[index].address + "<br>" + rawData[index].venueType,
                "extURL": rawData[index].extURL,
                "imgUID": rawData[index].imgUID,
                "imgSource": rawData[index].imgSource,
                "altText": rawData[index].altText,
                "caption": rawData[index].caption,
                "captionSource": rawData[index].captionSource,
                "captionSourceURL": rawData[index].captionSourceURL,
            }
        });
    };
    
    // >>> push geoJSON data to map with popup *FIX*

    // push data
    L.geoJSON(geoJSONMap, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng,{ icon: blackIcon })
        }
    }).addTo(map);

    // onEachFeature to create popup
    function onEachFeaturePopups (feature, layer) {
        if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
        }
    }

    // push geoJSON data to map with onEachFeature
    L.geoJSON(geoJSONMap, {
        onEachFeature: onEachFeaturePopups
    }).addTo(map);

/*
    let mapPoints = L.geoJSON(geoJSONMap, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng,{ icon: blackIcon })
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.popupContent);
        }
    }).addTo(map);
*/

} // end showData

// ### Back to top button
function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}