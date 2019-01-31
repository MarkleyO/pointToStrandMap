var mymap = L.map('map', {
  center: [44.13, -119.93],
  zoom: 7,
  maxZoom: 10,
  minZoom: 3,
  detectRetina: true
});

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);

var airPorts = null;
airPorts = L.geoJson.ajax("assets/airports.geojson", {
  attribution: 'AirPorts | Made By: Owen Markley'
});
airPorts.addTo(mymap);

var colors = chroma.scale('Dark2').mode('1ch').colors(9);

for(i=0; i<9; i++){
  $('head').append($("<style> .market-color-" + (i+1).toString() + " {color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}
