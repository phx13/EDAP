$(document).ready(function () {
    initIndexCharts();
    initIndexMap();
})

let map = initMap([11742379.009786982, 4387645.456171863], 4.5);

function initIndexMap() {
    initFeature();
    let popup = initOverlay();
    onOverlayClick(popup);
}

function initFeature() {
    $.when($.get('/project/data/')).done(function (data) {
        let points = data;
        let iconFeatures = [];
        points.forEach(function (point) {
            for (let key in point) {
                let coordinate = ol.proj.fromLonLat([point[key][0] * 1, point[key][1] * 1])
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

        let vectorSource = new ol.source.Vector({
            features: iconFeatures
        });

        let vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        map.addLayer(vectorLayer);
    });
}

function flyTo(location, done) {
    let duration = 2000;
    let zoom = 6;
    let parts = 2;
    let called = false;

    function callback(complete) {
        --parts;
        if (called) {
            return;
        }
        if (parts === 0 || !complete) {
            called = true;
            done(complete);
        }
    }

    map.getView().animate(
        {
            center: location,
            duration: duration,
        },
        callback
    );
    map.getView().animate(
        {
            zoom: zoom - 1,
            duration: duration / 2,
        },
        {
            zoom: zoom,
            duration: duration / 2,
        },
        callback
    );
}

function initOverlay() {
    let popup = new ol.Overlay({
        element: document.getElementById('popup'),
    });
    map.addOverlay(popup);
    return popup;
}

function onOverlayClick(popup) {
    map.on('click', function (evt) {
        let pixel = map.getEventPixel(evt.originalEvent);
        let feature = map.forEachFeatureAtPixel(pixel, function (feature) {
            return feature;
        });

        if (feature) {
            let element = popup.getElement();
            let coordinate = feature.getProperties()['geometry']['flatCoordinates'];
            let prjId = feature.getProperties()['id'];
            let info = feature.getProperties()['info'];
            flyTo(coordinate, function () {
            });

            $(element).popover('dispose');
            popup.setPosition(coordinate);
            $(element).popover({
                container: element,
                placement: 'top',
                animation: false,
                html: true,
                content: '<div class="card" style="width: 18rem;">\n' +
                    '        <img src="/images/thumbs/sensor.jfif" class="card-img-top" alt="...">\n' +
                    '        <div class="card-body">\n' +
                    '            <h5 class="card-title">区域设备信息</h5>\n' +
                    '            <p class="card-text" id="prjInfo"></p>\n' +
                    '            <a class="btn btn-outline-success" id="prjInfoBtn">查看详细信息</a>\n' +
                    '        </div>\n' +
                    '    </div>',
            });
            $(element).popover('show');
            $('#prjInfo').html(info);
            $('#prjInfoBtn').attr('href', "/project/" + prjId);
        } else {
            let element = popup.getElement();
            $(element).popover('dispose');
        }
    });
}