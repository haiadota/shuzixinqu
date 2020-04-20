
function createBigBuildingLayer() {
    CommonLayer.BigBuildingLayer = app.create({
        type: 'ThingLayer',
        name: 'polygonLayer'
    });
    map.addLayer(CommonLayer.BigBuildingLayer)
    $.ajax({
        type: 'GET',
        url: getUrl('file/data/fenjinBuilding.geojson'),
        dataType: 'json',
        success: function (data) {
            var fenjinBuildingLayer = app['create']({
                'type': 'BigBuildingLayer',
                'id': '123',
                'name': '建筑',
                'dataSource': data,
                'geometryType': 'GeoBuilding',
                'renderer': {
                    "type": "image",
                    imageUrl: [getUrl('file/img/building/building_top.png'),getUrl('file/img/building/building.png')],
                    textureWrap: CMAP.TextureWrapMode.Stretch, // 贴图循环方式为拉伸
                    // "imageUrl": [{
                    //     'condition': '[Height<30]',
                    //     'value': [getUrl('file/img/building/louding.jpg'),
                    //         getUrl('file/img/building/di.jpg')]
                    // }, {
                    //     'condition': '[Height>=30]\x20&&\x20[Height<70]',
                    //     'value': [getUrl('file/img/building/louding.jpg'),
                    //         getUrl('file/img/building/zhong.jpg')]
                    // }, {
                    //     'condition': '[Height>=70]',
                    //     'value': [getUrl('file/img/building/louding.jpg'),
                    //         getUrl('file/img/building/gao.jpg')]
                    // }],
                    "extrudeField": "Height",
                    "extrudeFactor": 2,
                    "transparent": true,
                    "blending": false,
                },
                'renderOrder': 0x10
            });
            CommonLayer.BigBuildingLayer.add(fenjinBuildingLayer);
        }
    });
    $.ajax({
        type: 'GET',
        url: getUrl('file/data/gaoxinBuilding.geojson'),
        dataType: 'json',
        success: function (data) {
            var gaoxinBuildingLayer = app['create']({
                'type': 'BigBuildingLayer',
                'id': '123',
                'name': '高新建筑',
                'dataSource': data,
                'geometryType': 'GeoBuilding',
                'renderer': {
                    // 'imageUrl': [{
                    //     'condition': '[Floor<4]',
                    //     'value': [getUrl('file/img/building/louding.jpg'),
                    //         getUrl('file/img/building/di.jpg')]
                    // }, {
                    //     'condition': '[Floor>=4]\x20&&\x20[Floor<11]',
                    //     'value': [getUrl('file/img/building/louding.jpg'),
                    //         getUrl('file/img/building/zhong.jpg')]
                    // }, {
                    //     'condition': '[Floor>=11]]',
                    //     'value': [getUrl('file/img/building/louding.jpg'),
                    //         getUrl('file/img/building/gao.jpg')]
                    // }],
                    'type': 'image',
                    imageUrl: [getUrl('file/img/building/building_top.png'),getUrl('file/img/building/building.png')],
                    textureWrap: CMAP.TextureWrapMode.Stretch, // 贴图循环方式为拉伸
                    'extrudeField': 'Floor',
                    "extrudeFactor": 15,
                    "transparent": false,
                    "blending": false,
                },
                'renderOrder': 0x10
            });
            CommonLayer.BigBuildingLayer.add(gaoxinBuildingLayer);
        }
    });
};