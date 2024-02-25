console.log("main.js is connected")

// ********** LEAFLET.JS MAP
// > grab map div from DOM
pageMap = document.getElementById("map");

// > create map & set main view center 
// >>> current center: African American Civil War Museum (U St NW & Vermont Ave NW) | latitude = 38.916271, longitude -77.025391
map = L.map(pageMap).setView({lon: -77.025391, lat: 38.916271}, 15.5);

// > add map tiles
// >>> tile: stamen toner by stadia maps
/*
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> <a href="https://stamen.com/" target="_blank">&copy; Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    
}).addTo(map);
*/

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// > show scale bar on the lower left corner
L.control.scale({imperial: true, metric: true}).addTo(map);


// - black map icons
const blackIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// - map details 
/* let wmataOverImg = "./elements/img/graphics/wmata-map-495.png";
let errorOverlayImg = "https://cdn-icons-png.flaticon.com/512/110/110686.png";
let wmataOverBounds = L.latLngBounds([[39.028492, -77.233734], [38.768111, -76.844407]])

let imageOverlay = L.imageOverlay(wmataOverImg, wmataOverBounds, {
    errorOverlayUrl: errorOverlayImg,
    opacity: .3,
    interactive: true
}).addTo(map); */

let mbldcGSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTftLVLS-R7Osjh6O60IornfVPoG2MK1TS7HluHkc6DE_uOwdKl75FsZLmPC7pWUcP_XsHiaSYajGmI/pub?gid=1259292064&single=true&output=csv";


// > geoJSON collection
let geoJSONMap = {
    type: "FeatureCollection",
    features: [],
}; 

// ********** DATA RETURN
// > papaparse CSV to JSON pull
Papa.parse(mbldcGSheetURL, {
    download: true,
    header: true,
    complete: showData,
});

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
                "popupContent": rawData[index].venueName + "<br>" + rawData[index].address + "<br>" + rawData[index].venueType + "<button>Card</button>",
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

    // console.log(geoJSON);
    
    
    // >>> push geoJSON data to map with popup *FIX*
    L.geoJSON(geoJSONMap, {
        pointToLayer: function(featured, latlng) {
            return L.marker(latlng,{ icon: blackIcon })
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup("content - fix")
        }
        }).addTo(map);

}

// Back to top button
function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}