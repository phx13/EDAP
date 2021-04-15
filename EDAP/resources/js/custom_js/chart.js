function initIndexCharts() {
    let topLeftChart = echarts.init(document.getElementById('topLeftChart'));
    let topLeftChartOption = {
        title: {
            text: '左上图表'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    topLeftChart.setOption(topLeftChartOption);

    let bottomLeftChart = echarts.init(document.getElementById('bottomLeftChart'));
    let bottomLeftChartOption = {
        title: {
            text: '左下图表'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        series: [
            {
                name: '2011年',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name: '2012年',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
    };
    bottomLeftChart.setOption(bottomLeftChartOption);

    let topRightChart = echarts.init(document.getElementById('topRightChart'));
    let topRightChartOption = {
        title: {
            text: '右上图表'
        },
        series: [
            {
                name: '面积模式',
                type: 'pie',
                radius: [20, 100],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    {value: 40, name: '1'},
                    {value: 38, name: '2'},
                    {value: 32, name: '3'},
                    {value: 30, name: '4'},
                    {value: 28, name: '5'},
                    {value: 26, name: '6'},
                    {value: 22, name: '7'},
                    {value: 18, name: '8'}
                ]
            }
        ]
    };
    topRightChart.setOption(topRightChartOption);

    let bottomRightChart = echarts.init(document.getElementById('bottomRightChart'));
    let bottomRightChartOption = {
        title: {
            text: '右下图表'
        },
        radar: [
            {
                indicator: [
                    {text: '语文', max: 150},
                    {text: '数学', max: 150},
                    {text: '英语', max: 150},
                    {text: '物理', max: 120},
                    {text: '化学', max: 108},
                    {text: '生物', max: 72}
                ],
                center: ['50%', '50%'],
                radius: 120
            }
        ],
        series: [
            {
                name: '成绩单',
                type: 'radar',
                data: [
                    {
                        value: [120, 118, 130, 100, 99, 70],
                        name: '张三',
                        label: {
                            show: true,
                            formatter: function (params) {
                                return params.value;
                            }
                        }
                    },
                    {
                        value: [90, 113, 140, 30, 70, 60],
                        name: '李四',
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
    };
    bottomRightChart.setOption(bottomRightChartOption);
}

function initProjectCharts() {
    let leftChart = echarts.init(document.getElementById('leftChart'));
    let leftChartOption = {
        title: {
            text: '左图表'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    leftChart.setOption(leftChartOption);

    let rightChart = echarts.init(document.getElementById('rightChart'));
    let rightChartOption = {
        title: {
            text: '右图表'
        },
        series: [
            {
                name: '面积模式',
                type: 'pie',
                radius: [30, 120],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    {value: 40, name: '1'},
                    {value: 38, name: '2'},
                    {value: 32, name: '3'},
                    {value: 30, name: '4'},
                    {value: 28, name: '5'},
                    {value: 26, name: '6'},
                    {value: 22, name: '7'},
                    {value: 18, name: '8'}
                ]
            }
        ]
    };
    rightChart.setOption(rightChartOption);
}