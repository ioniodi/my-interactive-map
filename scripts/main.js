var map = L.map('map').setView([39.6136,19.9126], 14);


L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

var featureGroup = L.featureGroup().addTo(map);

var drawControl = new L.Control.Draw({
	draw: {
	 polygon: false,
	 marker: false,
	 rectangle: false,
	 circle: false, 
	 circlemarker: false
	},
	edit: {
		featureGroup: featureGroup
	}
}).addTo(map);

map.on('draw:created', function(e) {
	// Each time a feaute is created, it's added to the over arching feature group
	featureGroup.addLayer(e.layer);
});


// on click, clear all layers
document.getElementById('delete').onclick = function(e) {
	featureGroup.clearLayers();
}

document.getElementById('export').onclick = function(e) {
	// Extract GeoJson from featureGroup
	var data = featureGroup.toGeoJSON();

	// Stringify the GeoJson
	var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

	// Create export
	document.getElementById('export').setAttribute('href', 'data:' + convertedData);
	document.getElementById('export').setAttribute('download','data.geojson');
}