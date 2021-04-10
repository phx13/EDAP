//window.onload = initMap;

$(document).ready(function () {
    initCharts();
    initMap();
})

function initMap() {
    const map = new ol.Map({
        target: 'indexMap',
        controls: [],
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM({
                    url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
                })
            })
        ],
        view: new ol.View({
            center: [12956765.891002344, 4853657.081627862],
            zoom: 11.5,
            maxZoom: 14,
            minZoom: 4,
        })
    });

    const leftChart = new ol.Overlay({
        element: document.getElementById('leftChart'),
    });
    map.addOverlay(leftChart);
}

function initCharts() {
    //attainment radar chart
    let attainmentRadarChart = echarts.init(document.getElementById("leftChart"));
    let attainmentRadarChartOption = {
        radar: [
            {
                indicator: [
                    {text: 'knowledge level', max: 100},
                    {text: 'Formative average score', max: 100},
                    {text: 'Formative accuracy', max: 100},
                    {text: 'Summative accuracy', max: 100},
                    {text: 'Summative average score', max: 100}
                ],
                center: ['50%', '50%'],
                radius: 120,
                startAngle: 90,
                splitNumber: 4,
                name: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#72ACD1'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            }
        ],
        series: [
            {
                type: 'radar',
                emphasis: {
                    lineStyle: {
                        width: 4
                    }
                },
                data: [
                    {
                        value: [70, 60, 50, 60, 40],
                        symbol: 'rect',
                        symbolSize: 5,
                        lineStyle: {
                            type: 'dashed'
                        },
                        label: {
                            show: true,
                            formatter: function (params) {
                                return params.value;
                            }
                        },
                        areaStyle: {
                            opacity: 0.9,
                            color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                                {
                                    color: '#B8D3E4',
                                    offset: 0
                                },
                                {
                                    color: '#72ACD1',
                                    offset: 1
                                }
                            ])
                        }
                    }
                ]
            }
        ]
    }
    attainmentRadarChart.setOption(attainmentRadarChartOption);
}

