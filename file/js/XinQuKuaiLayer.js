
function createXinQuKuai() {
    CommonLayer.XinQuKuaiLayer = app.create({
        type: 'ThingLayer',
        name: 'polygonLayer'
    });
    map.addLayer(CommonLayer.XinQuKuaiLayer)
    $.ajax({
        type: 'GET',
        url: getUrl('file/data/xinqukuai.geojson'),
        dataType: 'json',
        success: function (data) {
            let cityLayer = app.create(
                {
                    type: "FeatureLayer",
                    name: "xinqukuai",
                    dataSource: data,
                    geometryType: 'GeoPolygon',
                    height: 30, // 拔起的高度 单位米
                    renderer:
                        {
                            'type': 'vector', // 纯色填充
                            'color': [56, 134, 251], // 填充色
                            'opacity': 0.0, // 透明度
                            'outlineWidth': 4, // 边框宽度
                            'outlineColor': [68, 115, 221], // 边框色
                            // 'outlineEffect': true
                        }
                });
            CommonLayer.XinQuKuaiLayer.add(cityLayer);
        }
    });
}