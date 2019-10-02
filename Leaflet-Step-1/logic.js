
// Create Map object
var map = L.map('map', {
    center: [39.8283, -98.5795],
    zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(link, function(data) {

    console.log('data: ', data)

    for (var i = 0; i < data.length; i++) {
        var location = data.features[i].geometry
        console.log('coordinates: ', location.coordinates[1], location.coordinates[0])

        if (location) {
            L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
        }        
    }

});