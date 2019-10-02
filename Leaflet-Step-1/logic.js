
// Create Map object
var map = L.map('map', {
    center: [16.29905101, -3.1640625],
    zoom: 2.75
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
}).addTo(map);

var link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(link, function(data) {

    console.log('data: ', data)

    for (var i = 0; i < data.features.length; i++) {

        var location = data.features[i].geometry
        var properties = data.features[i].properties

        var color = '';
        if (properties.mag > 4.5) {
            color = '#FF0000';
        }
        else if (properties.mag > 2.5) {
            color = '#ffa500';
        }
        else if (properties.mag > 1) {
            color = '#ffff00';
        }
        else {
            color = '#008000';
        }

        L.circle([location.coordinates[1], location.coordinates[0]], {
            fillOpacity: 0.75,
            color: color,
            fillColor: color,
            radius: properties.mag * 20000
        }).bindPopup('<h2>' + properties.place + '</h2>').addTo(map)
    };

    var legend = L.control({
        position: 'topright'
    });
    
    legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'legend');
        div.innerHTML += '<h4>Earthquake Magnitudes</h4>';
        div.innerHTML += '<i style="background: #FF0000"></i><span>> 4.5</span><br>'
        div.innerHTML += '<i style="background: #ffa500"></i><span>> 2.5</span><br>'
        div.innerHTML += '<i style="background: #ffff00"></i><span>> 1</span><br>'
        div.innerHTML += '<i style="background: #008000"></i><span>< 1</span>'
    
        return div
    };
    
    legend.addTo(map);

});

