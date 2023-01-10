console.log("and it is I, the javascript behind the leaflet map")

pageMap = document.getElementById("map");

// ***** mbldc markers array: 0-venue, 1-address, 2-lat, 3-long,
 let mapPoints = [
    ["Harambee House Hotel", "2225 Georgia Ave, NW, Washington DC 20059", 38.9200080201834, -77.0216320019951]
    
    ]; 


// ***** initialize Leaflet map

// Howard University coordinates: 38.9227° N, 77.0194° W -- map center
map = L.map(pageMap).setView({lon: -77.0194, lat: 38.9227}, 12);

// add the OpenStreetMap tile
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

// show the scale bar on the lower left corner
L.control.scale({imperial: true, metric: true}).addTo(map);

// console.log(map);
// console.log(pageMap);

// ***** add points to leaflet map from mapPoints array

 for (let index = 0; index < mapPoints.length; index++) {
    let lat = mapPoints[index][2];
    console.log(lat);
    
    let lon = mapPoints[index][3];
    console.log(lon);

    let popup = mapPoints[index][0]+ "<br>" +"Address: "+mapPoints[index][1];
    console.log(popup);

    let pointLoc = new L.LatLng(lat, lon);
    console.log(pointLoc);

    let pointMarker = new L.Marker(pointLoc);
    console.log(pointMarker);

    map.addLayer(pointMarker);
    pointMarker.bindPopup(popup);
    
}


    
    