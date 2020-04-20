
function createRoadLayer() {
    CommonLayer.RoadLayer = app.create({
        type: 'ThingLayer',
        name: 'polygonLayer'
    });
    map.addLayer(CommonLayer.RoadLayer)
    $.ajax({
        'type': 'GET',
        'url': getUrl('file/data/raochenggaosu.geojson'),
        'dataType': 'json',
        'success': function (data) {
            let raochenggaosu = app.create({
                'type': 'FeatureLayer',
                'id': 0x154b,
                'name': '绕城高速',
                'dataSource': data,
                'geometryType': 'GeoLine',
                'renderer': {
                    'opacity': 0x1,
                    'type': 'image',
                    'lineType': 'Plane',
                    'imageUrl': getUrl("file/img/lan.png"),
                    'color': [0xff, 0x40, 0x27, 0x1],
                    'numPass': 0x1,
                    'effect': ![],
                    'width': 0x3,
                    'speed': 1.5
                },
                'renderOrder': 0x3
            });
            CommonLayer.RoadLayer.add(raochenggaosu);
        }
    });
    $.ajax({
        'type': 'GET',
        'url': getUrl('file/data/yijigonglu.geojson'),
        'dataType': 'json',
        'success': function (data) {
            let yijigonglu = app.create({
                'type': 'FeatureLayer',
                'id': 0x154b,
                'name': '一级公路',
                'dataSource': data,
                'geometryType': 'GeoLine',
                'renderer': {
                    'opacity': 0x1,
                    'type': 'image',
                    'lineType': 'Plane',
                    'imageUrl': getUrl("file/img/lan.png"),
                    'color': [0xff, 0x40, 0x27, 0x1],
                    'numPass': 0x1,
                    'effect': ![],
                    'width': 0x4,
                    'speed': 1.5
                },
                'renderOrder': 0x3
            });
            CommonLayer.RoadLayer.add(yijigonglu);
        }
    });
    $.ajax({
        'type': 'GET',
        'url': getUrl('file/data/erjigonglu.geojson'),
        'dataType': 'json',
        'success': function (data) {
            let erjigonglu = app.create({
                'type': 'FeatureLayer',
                'id': 0x154b,
                'name': '二级公路',
                'dataSource': data,
                'geometryType': 'GeoLine',
                'renderer': {
                    'opacity': 0x1,
                    'type': 'image',
                    'lineType': 'Plane',
                    'imageUrl': getUrl("file/img/lv.png"),
                    'color': [0xff, 0x40, 0x27, 0x1],
                    'numPass': 0x1,
                    'effect': ![],
                    'width': 0x4,
                    'speed': 0x1
                },
                'renderOrder': 0x3
            });
            CommonLayer.RoadLayer.add(erjigonglu);
        }
    });
}