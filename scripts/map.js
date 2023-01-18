console.log("and it is I, the javascript behind the leaflet map")

console.log(mapPoints[1][4]);
console.log(mapPoints[1][5]);
console.log(mapPoints[1][6]);

// >>>>> LEAFLET.JS MAP 

// *1 - grab map div from DOM
pageMap = document.getElementById("map");

// *2 - create map & set main view center 
// ^ current center: Logan Circle | latitude = 38.909142, longitude -77.029793
map = L.map(pageMap).setView({lon: -77.029793, lat: 38.909142}, 14.5);

// OpenStreetMap tile
/* L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map); */

// *3 - add stamen toner map tile
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
}).addTo(map);

// *4 - show scale bar on the lower left corner
L.control.scale({imperial: true, metric: true}).addTo(map);

// *5 - add map points: loop through mapPoints array to add map points to leaflet map
 for (let index = 0; index < mapPoints.length; index++) {
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
}

// >>>>> MAP LISTING CARDS
// *1 - grab mapCards div from DOM
let mapCards = document.getElementById("map-cards");

// *2 - loop through mapPoints to create and add listing card for each
for (let index = 0; index < mapPoints.length; index++) {
    // a. create card column to go in DOM map-cards row
    let cardCol = document.createElement("div");
    cardCol.className = "col";

    // b. create card element
    let card = document.createElement("div");
    card.className = "card grid-item";

    // c. create card body
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // d. create card title & store mapPoints data
    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title"
    cardTitle.innerText = mapPoints[index][0];

    // create card category & store mapPoints data
    let cardCat = document.createElement("h6")
    cardCat.className = "card-subtitle";
    cardCat.innerText = mapPoints[index][4];

    // e. create card text & store mapPoints data
    let cardText = document.createElement("p");
    cardText.className = "card-text"
    cardText.innerText = mapPoints[index][1];

    // create card img & store mapPoints img tag
    let cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.setAttribute("src", mapPoints[index][5]);

    // create card audio & store mapPoints data
    let cardAudio = document.createElement("audio");
    cardAudio.setAttribute("src", mapPoints[index][6]);
    cardAudio.setAttribute("onmouseover", "listAudio()");


    // create card link & store mapPoints external links
    let cardExtUrl = document.createElement("a");
    cardExtUrl.className = "btn btn-primary";
    cardExtUrl.setAttribute("href", mapPoints[index][7]);
    cardExtUrl.setAttribute("target", "blank")
    cardExtUrl.innerText = "Read More"


    // create modal button
    let cardModalBtn = document.createElement("button");
    cardModalBtn.className = "btn btn-primary";
    cardModalBtn.setAttribute("type","button")
    cardModalBtn.setAttribute("data-bs-toggle","modal");
    cardModalBtn.setAttribute("data-bs-target", "#exampleModal");
    cardModalBtn.innerText = "modal btn";

    // f. append card elements to card; append card to card column
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardCat);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardModalBtn);
    cardBody.appendChild(cardExtUrl);
    cardBody.appendChild(cardAudio);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    
   // cardCol.appendChild(card);
    
    // g. append card column to DOM card row div
  //  mapCards.appendChild(cardCol);
    mapCards.append(card);
};
    
let listAudio = document.getElementsByTagName("audio");
function playAudio() {
    listAudio.play();
}



let wmataOverImg = "./media/imgs/wmata-map-495 (2).png"
let errorOverlayImg = "https://cdn-icons-png.flaticon.com/512/110/110686.png";
// wmataCorner1 39.028492, -77.233734 | wmataCorner2 38.775205, -76.845436
let wmataOverBounds = L.latLngBounds([[39.028492, -77.233734], [38.768111, -76.844407]])


let imageOverlay = L.imageOverlay(wmataOverImg , wmataOverBounds, {
    errorOverlayUrl: errorOverlayImg,
    opacity: .5,
    interactive: true
}).addTo(map);