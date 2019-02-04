var mymap = L.map('map', {
  center: [44.13, -119.93],
  zoom: 7,
  maxZoom: 10,
  minZoom: 3,
  detectRetina: true
});

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
    attribution: 'Airport Tower Data &copy; Mike Bostock (D3) | United States &copy; usgs dataset | Base Map &copy; CartoDB'
}).addTo(mymap);

var color = null;

var airPorts = null;

airPorts = L.geoJson.ajax("assets/airports.geojson", {
  onEachFeature: function (feature, layer){
    layer.bindPopup(feature.properties.AIRPT_NAME);
  },
  pointToLayer: function (feature, latlng) {
    if(feature.properties.CNTL_TWR == "Y")//there is a tower
      return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-broadcast-tower fa-lg'})});
    else//there is no tower
      return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-plane-departure fa-lg'})});
  }
}).addTo(mymap);

colors = chroma.scale('Purples').mode('hsl').colors(5);

function setColor(density){
  var id=0;
  if(density>16){id=4;}
  else if(density>12 && density<=16){id=3;}
  else if(density>8 && density<=12){id=2;}
  else if(density>4 && density<=8){id=1;}
  else{id=0;}
  return colors[id];
}

function style(feature){
  return{
    fillColor: setColor(feature.properties.count),
    fillOpacity: 0.4,
    weight: 2,
    opacity: 1,
    color: '#ffffff',
    dashArray: '4'
  };
}

L.geoJson.ajax("assets/us-states.geojson",{
  style: style
}).addTo(mymap);

var legend = L.control({position: 'topright'});

legend.onAdd = function(){

  var div = L.DomUtil.create('div', 'legend');

  div.innerHTML += '<b># Airports</b><br />';
  div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5"></i><p>17+</p>';
  div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5"></i><p>13-16</p>';
  div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5"></i><p>9-12</p>';
  div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5"></i><p> 5-8</p>';
  div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5"></i><p> 0- 4</p>';
  div.innerHTML += '<hr><b>Has Broadcast Tower?<b><br />';
  div.innerHTML += '<i class="fa fa-broadcast-tower marker-color-1"></i><p> Yes</p>';
  div.innerHTML += '<i class="fa fa-plane-departure marker-color-2"></i><p> No</p>';

  return div;
};

legend.addTo(mymap);

L.control.scale({position: 'bottomleft'}).addTo(mymap);
