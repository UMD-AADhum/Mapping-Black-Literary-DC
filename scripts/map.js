console.log("map.js is connected")

// ********** VARIABLES
// > Google Sheets URL
// 1. upload an updated data file to Google Sheets
// 2. click 'File' > 'Share' > 'Publish to the web'
// 3. under 'Link' tab, click 'Webpage' dropdown and select CSV file from the menu
// 4. copy & paste link below
// 5. verify CSV by scrolling to very end of URL: ending should be '&output=csv'

let mbldcGSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTftLVLS-R7Osjh6O60IornfVPoG2MK1TS7HluHkc6DE_uOwdKl75FsZLmPC7pWUcP_XsHiaSYajGmI/pub?gid=1259292064&single=true&output=csv";

// > map cards div
let mapCards = document.getElementById("map-cards");

// > geoJSONCards collection
let geoJSONCards = {
    type: "FeatureCollection",
    features: [],
}; 

/*
// ********** LEAFLET.JS MAP
// > grab map div from DOM
pageMap = document.getElementById("map");

// > create map & set main view center 
// >>> current center: African American Civil War Museum (U St NW & Vermont Ave NW) | latitude = 38.916271, longitude -77.025391
map = L.map(pageMap).setView({lon: -77.025391, lat: 38.916271}, 15.5);

// > add map tiles
// >>> tile: stamen toner by stadia maps
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> <a href="https://stamen.com/" target="_blank">&copy; Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    
}).addTo(map);

// > show scale bar on the lower left corner
L.control.scale({imperial: true, metric: true}).addTo(map);
*/


// ********** DATA RETURN
// > papaparse CSV to JSON pull
 Papa.parse(mbldcGSheetURL, {
    download: true,
    header: true,
    complete: showData,
});

/*
const blackIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
}); 
*/

// > MBLDC data return function 
 function showData(result) {

    let rawData = result.data;
// >>> push rawData to geoJSONCards  
    for (let index = 0; index < rawData.length; index++) {
        geoJSONCards.features.push({
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
    }

    // console.log(geoJSONCards);


// > create map cards

// >>> loop through geoJSONCards and add card for each
    for (let index = 0; index < geoJSONCards.features.length; index++) {

        // create card column to go in DOM map-cards row
        let cardCol = document.createElement("div");
        cardCol.className = "col-sm-6 col-lg-4 mb-4 card show " + geoJSONCards.features[index].properties.category;

// >>>>> create card element
        let card = document.createElement("div");
        // card.className = "card " + geoJSONCards.features[index].properties.category;

// >>>>> set card ID
        card.setAttribute("id", geoJSONCards.features[index].properties.id);

// >>>>> create card body
        let cardBody = document.createElement("span");
        cardBody.className = "card-body";

// >>>>> create card title & store geoJSONCards data
        let cardTitle = document.createElement("h5");
        cardTitle.className = "card-title"
        cardTitle.innerText = geoJSONCards.features[index].properties.venueName;
        cardTitle.setAttribute("href", geoJSONCards.features[index].properties.extURL);
        cardTitle.setAttribute("target", "blank")


/*         // >>>>> create card link & store geoJSONCards external links
        let cardExtUrl = document.createElement("a");
        cardExtUrl.className = "btn btn-primary";
        cardExtUrl.setAttribute("href", geoJSONCards.features[index].properties.extURL);
        cardExtUrl.setAttribute("target", "blank")
        cardExtUrl.innerText = "Visit"
 */

// >>>>> create card category & store geoJSONCards data
        let cardCat = document.createElement("h6")
        cardCat.className = "card-subtitle";
        cardCat.innerText = geoJSONCards.features[index].properties.venueType;

// >>>>> create card text & store geoJSONCards data
// >>>>>>> address
        let cardAddress = document.createElement("p");
        cardAddress.className = "card-text"
        cardAddress.innerText = geoJSONCards.features[index].properties.address;

// >>>>>>> caption
        let cardCaption = document.createElement("p");
        cardCaption.className = "card-text"
        cardCaption.innerText = geoJSONCards.features[index].properties.caption;

// >>>>>>> caption source
        let cardCaptionSource = document.createElement("p");
        cardCaptionSource.className = "card-text"
        cardCaptionSource.innerText = "Caption Source: " + geoJSONCards.features[index].properties.captionSource;

// >>>>>>> image source
        let imgSource = document.createElement("p");
        imgSource.className = "card-text"
        imgSource.innerText = "Image Source: " + geoJSONCards.features[index].properties.imgSource;

// card footer
        let cardFooter = document.createElement("div");
        cardFooter.className = "card-footer-row"

// >>>>>>> learn more button
        let learnMoreBtn = document.createElement("a");
        learnMoreBtn.className = "btn card-btn";
        learnMoreBtn.setAttribute("href", geoJSONCards.features[index].properties.captionSourceURL);
        learnMoreBtn.setAttribute("target", "blank")
        learnMoreBtn.innerText = "Learn More"

// >>>>> create card img & store geoJSONCards img tag
        let cardImg = document.createElement("img");
        cardImg.className = "card-img-top";
        cardImg.setAttribute("src", "./elements/img/archive/thumbnails/" + geoJSONCards.features[index].properties.imgUID + ".jpg");
        cardImg.setAttribute("alt", geoJSONCards.features[index].properties.altText);

// >>>>> create modal trigger button
        let cardModalBtn = document.createElement("btn");
        cardModalBtn.setAttribute("type", "button");
        cardModalBtn.className = "btn btn-primary"
        cardModalBtn.setAttribute("data-bs-toggle", "modal"); 
        cardModalBtn.setAttribute("data-bs-target", "#modal-" + geoJSONCards.features[index].properties.id);

// >>>>> create & class modal elements for each card 
        // modal
        let cardModal = document.createElement("div");
        cardModal.className = "modal fade";
        cardModal.setAttribute("id", "modal-" + geoJSONCards.features[index].properties.id);
        cardModal.setAttribute("tabindex", "-1");
        cardModal.setAttribute("aria-labelledby", "modalLabel" + geoJSONCards.features[index].properties.id);
        cardModal.setAttribute("aria-hidden", "true");

        // modal-dialog
        let cardModalDialog = document.createElement("modal-dialog");
        cardModalDialog.className = "modal-dialog";

        // modal-content
        let cardModalContent = document.createElement("div");
        cardModalContent.className = "modal-content";

        // modal-header
        let cardModalHeader = document.createElement("div");
        cardModalHeader.className = "modal-header";

        // modal-header-h1 (modal header)
        let cardModalHeaderTxt = document.createElement("h1");
        cardModalHeaderTxt.className = "modal-title fs-5"
        cardModalHeaderTxt.setAttribute("id", "modalLabel" + geoJSONCards.features[index].properties.id)

        // modal-body
        let cardModalBody = document.createElement("div");
        cardModalBody.className = "modal-body";

        let cardModalBodyTest = document.createElement("p");
        cardModalBodyTest.innerText = "just testing to see if the modal works."

        // modal-footer
        let cardModalFooter = document.createElement("div");
        cardModalFooter.className = "modal-footer";

        // modal close btn (modal footer)
        let cardModalCloseBtn = document.createElement("button");
        cardModalCloseBtn.setAttribute("type", "button");
        cardModalCloseBtn.className = "btn-close";
        cardModalCloseBtn.setAttribute("data-bs-dismiss", "modal");
        cardModalCloseBtn.setAttribute("aria-label", "close")


// >>>>> create map with point for each modal

// >>>>> append modal elements to modal


// >>>>> append card elements to card; 
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardCat);
        cardBody.appendChild(cardAddress);
        cardBody.appendChild(cardCaption);
        cardBody.appendChild(cardCaptionSource);
        cardBody.appendChild(imgSource); 
        cardBody.appendChild(cardFooter)       
        cardFooter.appendChild(learnMoreBtn);
    //    cardBody.appendChild(cardExtUrl);
        card.appendChild(cardImg);
        card.appendChild(cardBody);
    //  cardCol.appendChild(card);

        cardModalBtn.appendChild = card;
        cardCol.appendChild(cardModalBtn);

        cardModalHeader.innerText = cardModalHeaderTxt;
        cardModalHeader.appendChild = cardModalCloseBtn;
        cardModalContent.appendChild(cardModalHeader);
        cardModalContent.appendChild(cardModalBody);
        cardModalContent.appendChild(cardModalFooter);


// >>>>> append card to DOM card row div
        mapCards.append(cardCol);

    }


// category filter
function filterSelection(c) {
    let x, i;
    x = document.getElementsByClassName("card");

    if (c === "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) {
            w3AddClass(x[i], "show");
        }
    }
}

// Show filtered elements
function w3AddClass(element, name) {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) === -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
function activeMenu(element) {
    let x = document.getElementsByClassName("btn")

    for (let i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "active");
    }

    element.classList.toggle("active", true)
}

// var btnContainer = document.getElementById("myBtnContainer");
// var btns = btnContainer.getElementsByClassName("btn");
// for (var i = 0; i < btns.length; i++) {
//     btns[i].addEventListener("click", function () {
//         var current = document.getElementsByClassName("active");
//
//         current[0].className = current[0].className.replace(" active", "");
//         this.className += " active";
//     });
// }

// scrollIntoView buttons

function scrollIntoViewPoint() {
    let scrollPointID = this.properties.id;
    console.log(scrollPointID);
    let scrollPoint = document.getElementById(scrollPointID);
    scrollPoint.scrollIntoView()
}

function scrollIntoViewCard() {
    let scrollCard = document.getElementById(geoJSONCards.features[index].properties.id);
    scrollCard.scrollIntoView()
}

} // end showData

// Back to top button
function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}