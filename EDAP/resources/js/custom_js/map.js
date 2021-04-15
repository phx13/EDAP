function initMap(center, zoom) {
    let tileLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    let view = new ol.View({
        center: center,
        zoom: zoom,
        maxZoom: 15,
        minZoom: 4,
    });

    return new ol.Map({
        target: 'map2d',
        controls: [],
        layers: [
            tileLayer
        ],
        view: view
    });
}