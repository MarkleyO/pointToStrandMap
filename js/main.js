var hideLabel = function(label){ label.labelObject.style.opacity = 0;};
var showLabel = function(label){ label.labelObject.style.opacity = 1;};
var labelEngine = new labelgun.default(hideLabel, showLabel);
var labels = [];

mycrs = new L.Proj.CRS('EPSG:2991',
    '+proj=lcc +lat_1=43 +lat_2=45.5 +lat_0=41.75 +lon_0=-120.5 +x_0=400000 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs',
    {
        resolutions: [8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1] // example zoom level resolutions
    }
);

var mymap = L.map('map', {
  crs: mycrs,
  center: [44.12, -119.93],
  zoom: 1,
  maxZoom: 10,
  minZoom: 0,
  detectRetina: true
});

// L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);

var airPorts = null;

airPorts = L.geoJson.ajax("assets/airports.geojson",{
  attribution: 'idk where its from',
  onEachFeature: function (feature, layer){
    layer.bindPopup(feature.properties.AIRPT_NAME);
  },
  pointToLayer: function (feature, latlng) {
    if(feature.properties.CNTL_TWR == "Y")//there is a tower
      return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-broadcast-tower fa-lg'})});
    else//there is no tower
      return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-plane-departure fa-lg'})});
  }
});
airPorts.addTo(mymap);

var colors = chroma.scale('Purples').mode('hs1').colors(5);

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

L.geoJson.ajax("assets/usStates.geoJson",{
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

// L.control.scale({position: 'bottomleft'}).addTo(mymap);

L.latlngGraticule({
    showLabel: true,
    opacity: 0.2,
    color: "#593299",
    font: 'Playfair Display',
    lngLineCurved: 0,
    latLineCurved: 0,
    zoomInterval: [
        {start: 0, end: 7, interval: 4},
        {start: 8, end: 11, interval: 1}
    ]
}).addTo(mymap);

var states = null;
states = L.geoJson.ajax("assets/usStates.geojson", {
    style: style,
    onEachFeature: function (feature, label) {
        label.bindTooltip(feature.properties.name, {className: 'feature-label', permanent:true, direction: 'center'});
        labels.push(label);
    }
}).addTo(mymap);

function addLabel(layer, id) {
    var label = layer.getTooltip()._source._tooltip._container;
    if (label) {
        var rect = label.getBoundingClientRect();
        var bottomLeft = mymap.containerPointToLatLng([rect.left, rect.bottom]);
        var topRight = mymap.containerPointToLatLng([rect.right, rect.top]);
        var boundingBox = {
            bottomLeft : [bottomLeft.lng, bottomLeft.lat],
            topRight   : [topRight.lng, topRight.lat]
        };

        labelEngine.ingestLabel(
            boundingBox,
            id,
            parseInt(Math.random() * (5 - 1) + 1), // Weight
            label,
            label.innerText,
            false
        );

        if (!layer.added) {
            layer.addTo(mymap);
            layer.added = true;
        }
    }
}

mymap.on("zoomend", function(){
    var i = 0;
    states.eachLayer(function(label){
        addLabel(label, ++i);
    });
    labelEngine.update();
});
