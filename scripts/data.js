console.log("data.js is connected")

// ********** VARIABLES
// > Google Sheets URL
// 1. upload an updated data file to Google Sheets
// 2. click 'File' > 'Share' > 'Publish to the web'
// 3. under 'Link' tab, click 'Webpage' dropdown and select CSV file from the menu
// 4. copy & paste link below
// 5. verify CSV by scrolling to very end of URL: ending should be '&output=csv'
let mbldcGSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTftLVLS-R7Osjh6O60IornfVPoG2MK1TS7HluHkc6DE_uOwdKl75FsZLmPC7pWUcP_XsHiaSYajGmI/pub?gid=1259292064&single=true&output=csv";

// > geoJSON collection
let geoJSON = {
    type: "FeatureCollection",
    features: [],
};

// ********** DATA RETURN

// > MBLDC data return function
/* 
function showData(result) {

    let rawData = result.data;
// >>> push rawData to geoJSON  
    for (let index = 0; index < rawData.length; index++) {
        geoJSON.features.push({
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

     console.log(geoJSON);



};
*/


function showData(rawData) {

    console.log(rawData)


   // let rawData = result.data;

    
// >>> push rawData to geoJSON  
    for (let index = 0; index < rawData.length; index++) {
        geoJSON.features.push({
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

     console.log(geoJSON);



};

function parseData(url, callBack) {

Papa.parse(url, {
    download: true,
    header: true,
    complete: function(results) {
        callBack(results.data)
    },
});
}

parseData(mbldcGSheetURL, showData);


console.log(geoJSON);




// > papaparse CSV to JSON pull
/*
Papa.parse(mbldcGSheetURL, {
    download: true,
    header: true,
    complete: showData,
});
*/


