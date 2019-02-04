var mymap = L.map('map', {
  center: [44.13, -119.93],
  zoom: 7,
  maxZoom: 10,
  minZoom: 3,
  detectRetina: true
});

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);

//var airPorts = null;
// airPorts = L.geoJson.ajax("assets/airports.geojson", {
//   attribution: 'AirPorts | Made By: Owen Markley'
// });
//airPorts.addTo(mymap);

L.geoJson.ajax("assets/airports.geojson", {
  onEachFeature: function (feature, layer){
    layer.bindPopup(feature.propeties.AIRPT_NAME);
  },
  pointToLayer: function (feature, latlng) {
    console.log("here");
    if(feature.properties.CNTL_TWR == "Y")//there is a tower
      return L.marker(latlng, {icon: L.divIcon({classname: 'fa fa-broadcast-tower'})});
    else//there is no tower
      return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-plane-departure'})});
  }
}).addTo(mymap);

L.geoJson.ajax("assets/us-states.geojson").addTo(mymap);
