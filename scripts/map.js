console.log("map.js is connected")

// ********** VARIABLES
// > Google Sheets URL
// 1. upload an updated data file to Google Sheets
// 2. click 'File' > 'Share' > 'Publish to the web'
// 3. under 'Link' tab, click 'Webpage' dropdown and select CSV file from the menu
// 4. copy & paste link below
// 5. verify CSV by scrolling to very end of URL: ending should be '&output=csv'
let mbldcGSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTftLVLS-R7Osjh6O60IornfVPoG2MK1TS7HluHkc6DE_uOwdKl75FsZLmPC7pWUcP_XsHiaSYajGmI/pub?gid=397357141&single=true&output=csv ";

// > map cards div
let mapCards = document.getElementById("map-cards");

// > geoJSON collection
let geoJSON = {
    type: "FeatureCollection",
    features: [],
};

// ********** LEAFLET.JS MAP
// > grab map div from DOM
pageMap = document.getElementById("map");

// > create map & set main view center 
// >>> current center: Logan Circle | latitude = 38.909142, longitude -77.029793
map = L.map(pageMap).setView({lon: -77.029793, lat: 38.909142}, 14.5);

// > add map tiles
// >>> tile: toner, stamen maps
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
}).addTo(map);

// > show scale bar on the lower left corner
L.control.scale({imperial: true, metric: true}).addTo(map);

// ********** DATA RETURN
// > papaparse CSV to JSON pull
Papa.parse(mbldcGSheetURL, {
    download: true,
    header: true,
    complete: showData,
});

// > MBLDC data return function 
function showData(result) {

    let rawData = result.data;
// >>> push rawData to geoJSON  
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
                "category": rawData[index].category,
                "address": rawData[index].address,
                "popupContent": rawData[index].venueName + "<br>" + rawData[index].address + "<br>" + rawData[index].venueType + "<button>Card</button>",
                "extURL" : rawData[index].extURL,
                "imgUID" : rawData[index].imgUID,
                "altText" : rawData[index].altText,
                "caption" : rawData[index].caption,
                "captionSource": rawData[index].captionSource,
                "captionSourceURL" : rawData[index].captionSourceURL
                }
        });
    };
    // console.log(geoJSON);



// > create map cards

// >>> loop through geoJSON and add card for each
for (let index = 0; index < geoJSON.features.length; index++) {
   
    // create card column to go in DOM map-cards row
    let cardCol = document.createElement("div");
    cardCol.className = "col-sm-6 col-lg-4 mb-4";

// >>>>> create card element
    let card = document.createElement("div");
    card.className = "card " + geoJSON.features[index].properties.category;

// >>>>> set card ID
    card.setAttribute("id", geoJSON.features[index].properties.id);
    console.log(card.id);

// >>>>> create card body
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

// >>>>> create card title & store geoJSON data
    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title"
    cardTitle.innerText = geoJSON.features[index].properties.venueName;

// >>>>> create card category & store geoJSON data
    let cardCat = document.createElement("h6")
    cardCat.className = "card-subtitle";
    cardCat.innerText = geoJSON.features[index].properties.venueType;

// >>>>> create card text & store geoJSON data
// >>>>>>> address
    let cardAddress = document.createElement("p");
    cardAddress.className = "card-text"
    cardAddress.innerText = geoJSON.features[index].properties.address;

// >>>>>>> caption
    let cardCaption = document.createElement("p");
    cardCaption.className = "card-text"
    cardCaption.innerText = geoJSON.features[index].properties.caption;

// >>>>>>> caption source
    let cardCaptionSource = document.createElement("p");
    cardCaptionSource.className = "card-text"
    cardCaptionSource.innerText = geoJSON.features[index].properties.captionSource;

// >>>>>>> caption source URL
    let cardCaptionSourceURL = document.createElement("a");
    cardCaptionSourceURL.className = "btn btn-primary";
    cardCaptionSourceURL.setAttribute("href", geoJSON.features[index].properties.captionSourceURL);
    cardCaptionSourceURL.setAttribute("target", "blank")
    cardCaptionSourceURL.innerText = "Learn More"

// >>>>> create card img & store geoJSON img tag
    let cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.setAttribute("src", "./elements/img/archive/thumbnails/" + geoJSON.features[index].properties.imgUID + ".jpg");
    cardImg.setAttribute("alt", geoJSON.features[index].properties.altText);

// >>>>> create card link & store geoJSON external links
    let cardExtUrl = document.createElement("a");
    cardExtUrl.className = "btn btn-primary";
    cardExtUrl.setAttribute("href", geoJSON.features[index].properties.extURL);
    cardExtUrl.setAttribute("target", "blank")
    cardExtUrl.innerText = "Visit"

// >>>>> append card elements to card; 
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardCat);
    cardBody.appendChild(cardAddress);
    cardBody.appendChild(cardCaption);
    cardBody.appendChild(cardCaptionSource);
    cardBody.appendChild(cardCaptionSourceURL);
    cardBody.appendChild(cardExtUrl);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    cardCol.appendChild(card);
    

// >>>>> append card to DOM card row div
    mapCards.append(cardCol);
};

// >>> push geoJSON data to map with popup *FIX*    
L.geoJSON(geoJSON).addTo(map).bindPopup("content - fix");

};

// > map details 
let wmataOverImg = "./elements/img/maps/wmata-map-495.png";
let errorOverlayImg = "https://cdn-icons-png.flaticon.com/512/110/110686.png";
let wmataOverBounds = L.latLngBounds([[39.028492, -77.233734], [38.768111, -76.844407]])

let imageOverlay = L.imageOverlay(wmataOverImg , wmataOverBounds, {
    errorOverlayUrl: errorOverlayImg,
    opacity: .3,
    interactive: true
}).addTo(map); 


// scrollIntoView buttons
function scrollIntoViewPoint() {
    let scrollPointID = this.properties.id;
    console.log(scrollPointID);
    let scrollPoint = document.getElementById(scrollPointID);
    scrollPoint.scrollIntoView()
}

function scrollIntoViewCard() {
    let scrollCard = document.getElementById(geoJSON.features[index].properties.id);
    scrollCard.scrollIntoView()
}

// category filter
/*
 filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("card");
  console.log(x);

  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split("card ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split("card ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

 */



function showArts () {
    let allCards = document.getElementsByClassName("card");
    console.log(allCards);

    for (let index = 0; index < allCards.length; index++) {
        
        if (element.className === "card arts") {
            allCards[index].setAttribute("class", "show")
        } else {
            allCards[index].setAttribute("class", "hide")

        }
        
    }

}



// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}