#Lab 3 Write-Up
>Winter 2018 | Owen Markley | Geography 371: Web Mapping
>Bo Zhao | Wilkinson 210 | Th 800 - 1150
>Due Feb 4th, 2019

**Intro**

The map is a choropleth map illustrating the various airports of the United States. Each port is represented by either a tower or a plane based of whether or not it has an air traffic control tower. Upon clicking the markers, the name of the respective airport will appear. Each states is also shaded to indicate how many ports it has within it's borders. A scale and legend are also provided on the map.

**Function Descriptions**
Most of the CSS, and HTML is pretty light, so I'll just go into the javascript

>Here the map is initialized using leaflet, the initial state of the map(position, zoom, etc.) is set here.

>A layer of tiles is put into place from CartoDB, this comes with continents, borders, major cities, etc.

>In this function, the date from the airports file is brought in. On each data point that comes through, a popup with the name of the airport is bound. At every point, there is a also a function to check whether or not there is a tower, once the status of this has been determined, a new icon is associated with the marker from the font awesome library. The points are then all added to the map after.

>An array of colors is then initialized for use in shading the States.

>setColor goes through all the points when it is called in style. A series of else if statements determines to which range of numbers the amount of airports belongs to. Next an id is assigned based off of that range. The corresponding color from the colors array is then returned by the funciton.

>The style function sets the standard styling of the states which are taken in from the geojson file. It is when the color of the states is being defined, that the setColor function defined earlier is called.

>Here the geojson file of the states is actually read in and fed to the style and setColor functions and placed on the map.

>Next the legend is defined using leaflet. Upon adding this to the DOM, a function is called to create and add HTML code into the site. This adds in the sample colors and the sample icons to the legend. After it is added to the map with the rest of the elements.

>Leaflet is then lastly used to add a default scale to the map. 



**Libraries:**

- Leaflet
- Font Awesome
- Titillium Web
- JQuery
- Chroma

**Data Sources:**

State Borders - https://catalog.data.gov/dataset/usgs-small-scale-dataset-airports-of-the-united-states-201207-shapefile
Airports - [Mike Bostock](http://bost.ocks.org/mike) of [D3](http://d3js.org/)
Basemap - [Carto DB](https://carto.com/)
