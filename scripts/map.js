console.log("map.js is connected")
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

let mapCards = document.getElementById("map-cards");

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
                "venueName": rawData[index].venueName,
                "venueType": rawData[index].venueType,
                "address": rawData[index].address,
                "popupContent": rawData[index].venueName + rawData[index].address + rawData[index].venueType,
                "extURL" : rawData[index].extURL,
                "imgUID" : rawData[index].imgUID
                }
        });
    };
    console.log(geoJSON);
    L.geoJSON(geoJSON).addTo(map).bindPopup("popupContent");

// *2 - loop through mapPoints to create and add listing card for each
for (let index = 0; index < geoJSON.features.length; index++) {
   
    // a. create card column to go in DOM map-cards row
    // let cardCol = document.createElement("div");
    // cardCol.className = "col";

    // b. create card element
    let card = document.createElement("div");
    // card.className = "card grid-item";
    card.className = "card";

    // set card ID
    card.setAttribute("id", geoJSON.features[index].properties.id);
    console.log(card.id);

    // c. create card body
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // d. create card title & store mapPoints data
    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title"
    cardTitle.innerText = geoJSON.features[index].properties.venueName;

    // create card category & store mapPoints data
    let cardCat = document.createElement("h6")
    cardCat.className = "card-subtitle";
    cardCat.innerText = geoJSON.features[index].properties.venueType;

    // e. create card text & store mapPoints data
    let cardText = document.createElement("p");
    cardText.className = "card-text"
    cardText.innerText = geoJSON.features[index].properties.address;

    // create card img & store mapPoints img tag
    let cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.setAttribute("src", "./elements/img/archive/thumbnails/" + geoJSON.features[index].properties.imgUID + ".jpg");

    // create card link & store mapPoints external links
    let cardExtUrl = document.createElement("a");
    cardExtUrl.className = "btn btn-primary";
    cardExtUrl.setAttribute("href", geoJSON.features[index].properties.extURL);
    cardExtUrl.setAttribute("target", "blank")
    cardExtUrl.innerText = "Visit"

    // f. append card elements to card; 
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardCat);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardExtUrl);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    

    // g. append card to DOM card row div
    mapCards.append(card);
};

};


let wmataOverImg = "./elements/img/maps/wmata-map-495.png";
let errorOverlayImg = "https://cdn-icons-png.flaticon.com/512/110/110686.png";
let wmataOverBounds = L.latLngBounds([[39.028492, -77.233734], [38.768111, -76.844407]])

let imageOverlay = L.imageOverlay(wmataOverImg , wmataOverBounds, {
    errorOverlayUrl: errorOverlayImg,
    opacity: .3,
    interactive: true
}).addTo(map); 
