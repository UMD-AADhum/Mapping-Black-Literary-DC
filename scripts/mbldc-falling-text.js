console.log("falling-text is connected!")

    /* chiData JSON */
    let chiData = {
        "centerNames": [
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
        ]  
    };

/* >>> Variables: stores returns from the JSON object. */    
    let chiDataNames = "";

/* >>> Interval: sets the function to run every 1200 milliseconds. */
setInterval(chiDataNamesRet, 2400);

/* >>> chiData function: returns a random phrase from the chiData JSON object and store it to a variable. */
    function chiDataNamesRet() {
    for (let index = 0; index < chiData.centerNames.length; index++) {
        chiDataNames = chiData.centerNames[Math.floor(Math.random() * 8)];
        console.log(chiDataNames);
    };

/* // Browser Returns: returns variables to browser window as text. */
    document.getElementById("chiDataNamestxt").innerText = chiDataNames;
}