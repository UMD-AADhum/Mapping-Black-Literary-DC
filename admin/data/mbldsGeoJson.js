console.log("mbldsGeoJson is connected")
// a. script pulls csv data from Google Sheet to json with papa parse
//>>>>> ~# show json on test-data.html #~
// b. adds json to mbldsGeoJson.js
//>>>>> ~# show geojson on test-data.html #~
// = c. return geojson to map as points on map.js page

// A - papa parse data return
// * this function returns MBLDC CSV data uploaded via Google Sheets share link as JSON 

// Google Sheets URL
// 1. upload an updated data file to Google Sheets
// 2. click 'File' > 'Share' > 'Publish to the web'
// 3. under 'link' tab, click 'webpage' dropdown and select CSV file from the menu
// 4. copy & paste link below
let mbldcGSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRxFiZnGjdcfvbRu2SaYPWrGaXe4OY9_oaWCItPVET6ZhlFpYBB8rUTJ0SIwaO37l5z5PLfza2n5K7w/pub?output=csv";

Papa.parse(mbldcGSheetURL, {
    download: true,
    header: true,
    complete: showData,
});

function showData(result) {
    console.log(result.data);

    let mbldcData = result.data;
    console.log(mbldcData);

    let showMeData = mbldcData[2].venue;
    console.log(showMeData);
    
    document.getElementById('data-view').innerText = showMeData;
};