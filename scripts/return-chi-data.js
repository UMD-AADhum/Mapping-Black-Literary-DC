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
    for (let index = 0; index < chiData.centerName.length; index++) {
        chiDataName = chiData.centerName[Math.floor(Math.random() * 8)];
        console.log(chiDataName);

    // store a random company name from chiData to a variable
        chiDataComp = chiData.companyName[Math.floor(Math.random() * 8)];
    };

    // returns variable contents to browser window as text
        document.getElementById("txt-chi-data-name").innerText = chiDataName;
        document.getElementById("txt-chi-data-comp").innerText = chiDataComp;

};

// set getText() to run every 1200 milliseconds
setInterval(getText, 2400);

// button click event
document.getElementById("btn-get-text")