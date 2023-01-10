console.log("and it is I, the javascript behind the leaflet map")


pageMap = document.getElementById("map");


 // initialize Leaflet
        // Howard University coordinates: 38.9227° N, 77.0194° W
        map = L.map(pageMap).setView({lon: -77.0194, lat: 38.9227}, 12);
        
  
        // add the OpenStreetMap tile
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(map); 

        
  
        // show the scale bar on the lower left corner
        L.control.scale({imperial: true, metric: true}).addTo(map);

        
  
        // show a marker on the map. ID numbers correspond to the ID on table rows
        // 1
        L.marker({lon: -77.017208, lat: 38.903657}).bindPopup('440 L ST WASHINGTON DC 20001-2587').addTo(map);

        // 2
        L.marker({lon: -77.05835, lat: 38.904652}).bindPopup('1101 5TH ST WASHINGTON DC 20001-3730').addTo(map);

        // 3
        L.marker({lon: -77.024859, lat: 38.919182}).bindPopup('900 W ST WASHINGTON DC 20001-4032').addTo(map);

        // 4
        L.marker({lon: -77.020912, lat: 38.894154}).bindPopup('625 INDIANA AVE WASHINGTON DC 20004-2930').addTo(map);

        // 5
        L.marker({lon: -77.047235, lat: 38.917739}).bindPopup('2101 CONNECTICUT AVE WASHINGTON DC 20008-1752').addTo(map);

        console.log(map);
        console.log(pageMap);

        