$(document).ready(function () {
    initProjectCharts();
    initProjectMap();
})


function initProjectMap() {
    let prjId = window.location.pathname.split('/').pop();
    initFeature(prjId);
}

function initFeature(prj_id) {
    $.when($.get('/project/data/' + prj_id)).done(function (data) {
        let points = data;
        let iconFeatures = [];
        let coordinate = [];
        points.forEach(function (point) {
            for (let key in point) {
                coordinate = ol.proj.fromLonLat([point[key][0] * 1, point[key][1] * 1])
                let iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(coordinate),
                    id: key,
                    info: point[key][2]
                });
                let iconStyle = new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: '../../images/icons/sensor.png',
                        scale: 0.2
                    })
                });
                iconFeature.setStyle(iconStyle);
                iconFeatures.push(iconFeature);
            }
        });

        let map = initMap(coordinate, 10);

        let vectorSource = new ol.source.Vector({
            features: iconFeatures
        });

        let vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        map.addLayer(vectorLayer);
    });
}