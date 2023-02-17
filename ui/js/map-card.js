console.log("mapCards.js connected");

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

    // set card ID
    card.setAttribute("id", mapPoints[index][8]);
    console.log(card.id);

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
    cardModalBtn.setAttribute("data-bs-target", "#mainModal");
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