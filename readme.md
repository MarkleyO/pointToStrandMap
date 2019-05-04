#Lab 3 Write-Up
>Spring 2019 | Owen Markley | Geography 472: Geovisual Analytics
>Bo Zhao | Wilkinson 210 | T 500 - 700 pm
>Due May 2nd, 2019

**Intro**

This is a choropleth map built on top of a Lambert projection. Each airport is represented by either a symbol of a tower or a plane. A tower symbol means that the airport has an air traffic control tower. Clicking on these airports gives the name of the selected airport. The scale on the top right of the map provides the information needed to understand what each color or symbol represents. Unfortunately there is no base map on this assignment, so the user can't tell what lies outside of the mapped region.

**Function Descriptions**
Most of the CSS, and HTML is pretty light, so I'll just go into the javascript. Each section represents a different chunk of code separated by a line break in the .js file.

>Here variables are set for the purpose of placing labels on the states with their names. Included is a function to show and hide these labels, as well as an initialization of the labelgun library, and an empty array to store the state name labels in.

>Next, mycrs is initialized, this is the Lambert projection mentioned in the intro section. The resolutions are there because there are specifically set zoom levels which are allowed by the projection. The projection is taken from spatialreference.org and is called ESPG:2991. This is a good projection because it portrays middle latitudes with an east-west orientation well. Due to this, it is very accurate for North America. However there might be some distortion around Alaska.

>Here the map object is initialized using leaflet, the mycrs is connected to the map, and the zoom levels, and starting center is selected in this portion of the code.

>The airports are collected from the file, and each one is bound to a popup which retrieves the name of the port from the geojson file. Each point is also bound to a symbol from font awesome based upon whether or not a tower is present at the port. Again, this is taken from the geojson file.

>An array of colors is created to be used by the program for the choropleth map. A function is then created to run all the state features through. The density is how many airports are present in the state, and each states is assigned an id value to determine which color it should be.

>The style function sets the standard styling of the states which are taken in from the geojson file. It is when the color of the states is being defined, that the setColor function defined earlier is called.

>Next the legend is defined using leaflet. Upon adding this to the DOM, a function is called to create and add HTML code into the site. This adds in the sample colors and the sample icons to the legend. After it is added to the map with the rest of the elements.

>After the legend has been added, graticules are placed upon the map, the curve and changing placement of the graticules that can be seen with movement is a result of the Lambert projection that was selected at the start. The graticules are also given a different interval based upon how far zoomed in the user is.

>States themselves are then added to the map, they are run through the style function and consequently the setColor function. On the addition of each state, the label mentioned at the start is retrieved and bound to each state.

>The next function is used to avoid overlap between the labels.

>Lastly visualization is updated whenever the user zooms in on the map.



**Libraries:**

- Leaflet
- Font Awesome
- Google Font API (Playfair Display, Muli)
- Labelgun
- rbush
- Leaflet ajax
- JQuery
- Chroma
- Leaflet latlng graticules
- proj4

**Data Sources:**

State Borders - https://catalog.data.gov/dataset/usgs-small-scale-dataset-airports-of-the-united-states-201207-shapefile
Airports - [Mike Bostock](http://bost.ocks.org/mike) of [D3](http://d3js.org/)
Projection - http://spatialreference.org/
