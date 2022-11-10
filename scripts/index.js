console.log("return-chi-data is connected!")

// >>> chiData 
let chiData = {
    "centerName": [
        "Hostway Boeing Data Center",
        "Lumen Chicago",
        "XO Chicago",
        "CBOT Data Center",
        "FDCservers.net Chicago",
        "CoreSite Chicago (CH2)",
        "Lumen Chicago 3",
        "ANET Chicago",
        "Cogent Chicago 2",
        "QTS Chicago"
    ],
    "companyName" : [
        "Hostway Services, Inc",
        "Lumen",
        "XO Communications",
        "Data Stream LLC",
        "FDCservers.net LLC",
        "CoreSite",
        "ANET Internet Solutions",
        "Cogent Communications, Inc.",
        "QTS Data Centers"
    ]
};

// create variables   
let chiDataName = "";
let chiDataComp = "";

// >>> getText function
function getText() {

    // store a random center name from chiData to a variable
        chiDataName = chiData.centerName[Math.floor(Math.random() * 8)];
        console.log(chiDataName);

    // store a random company name from chiData to a variable
        chiDataComp = chiData.companyName[Math.floor(Math.random() * 8)];
        console.log(chiDataComp);

    // returns variable contents to browser window as text
        document.getElementById("txt-chi-data-name").innerText = chiDataName;
        document.getElementById("txt-chi-data-comp").innerText = chiDataComp;
};

// set getText() to run every 1200 milliseconds (after button is clicked)
setInterval(getText, 2400);

// button click event
// document.getElementById("btn-get-text").onclick = function() {getText( )};

console.log("falling-text is connected!")

let fallTime = null;

// >>> fallingText function

function fallingText() {
    // grab HTML elements to be moved
    let fallName = document.getElementById("div-chi-data-name");
    let fallComp = document.getElementById("div-chi-data-comp");

    // set starting element position
    let position = 0;

    // set timing for element movement
    clearInterval(fallTime);
    fallTime = setInterval(fall, 10);

    // move elements according to timing
    function fall() {
        if (position == 500) {
            clearInterval(fallTime);
            fallTime = setInterval(fall, 10);
            position = 0
        }   
        else {
            position++;
            fallName.style.top = position + 'px'; 
            fallComp.style.left = position + 'px';
        }
    }
};
fallingText();

// button click event
/* document.getElementById("btn-falling-text").onclick = function() {fallingText( )}; */
