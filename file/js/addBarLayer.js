function addBarLayer() {
    if (HandleLayer.BarLayer) {
        map.remove(HandleLayer.BarLayer);
        HandleLayer.BarLayer.destroy()
        HandleLayer.BarLayer = null
        initialView()
        return
    }
    // 摄像机飞行到某位置
    app.camera.flyTo({
        'position': [2660528.9735005624,4416296.986036229,3756353.429625177],
        'target': [2655064.4921712587,4416925.305654509,3757697.037148752],
        'time': 2000,
        'complete': function() {
        }
    });
    HandleLayer.BarLayer = app.create({
        type: 'ThingLayer',
        name: 'BarLayer'
    });
    map.addLayer(HandleLayer.BarLayer);
    var url = getUrl('file/data/sheQuRenKou.geojson')
    $.ajax({
        'type': 'GET',
        'url': url,
        'dataType': 'json',
        'success': function (data) {
            var cnt = data.features.length;
            for (var i = 0; i < cnt; i += 1) {
                let feature = data.features[i];
                let building = app.create({
                    type: 'GeoBuilding',
                    name: 'build' + i,
                    coordinates: feature.geometry.coordinates,
                    userData: feature.properties,
                    height: feature.properties.population,
                    renderer: {
                        type: 'vector',
                        textureWrap:CMAP.TextureWrapMode.Stretch,
                        color: [189, 133, 26]
                    },
                });
                let geoPoint = app.create({
                    type: 'GeoPoint',
                    id: 'renKouPoint'+i,
                    coordinates: feature.geometry.coordinates[0][0],
                    renderer: {
                        type: 'vector', // vector 代表使用内置矢量符号
                        vectorType: 'circle', // 矢量符号形状 circle(圆形),triangle(三角形),rectangle(正方形),cross(十字)
                        color: [255, 0, 0], // 矢量符号填充色
                        opacity: 0.0, // 符号不透明度
                        lineColor: [255, 255, 0], // 描边颜色
                        lineOpacity: 0.0, // 描边透明度
                        lineWidth: 0, // 描边宽度
                        size: 0, // 缩放比例
                    },
                    complete: (e) => {
                        addRenKouInfo(e.object,feature);
                    },
                });
                HandleLayer.BarLayer.add(building);
                HandleLayer.BarLayer.add(geoPoint);
            }
        }
    });
}
const RenKouInfoEle = function (data) {
    const div = document.createElement('div');
    div.innerHTML =
        `<div class="renkou_box">
            <div class="d">${data.properties.name}</div>
            <div class="d">
                <span>人口：</span>
                <span>${data.properties.population}户</span>
            </div>
        </div>`;
    return div;
}
const addRenKouInfo = function (obj,data) {
    console.log(data)
    // 获取中心点坐标
    const position = map.util.convertLonlatToWorld(obj.coordinates, data.properties.population+120);
    app.create({
        type: 'Marker',
        id: obj.id,
        element: RenKouInfoEle(data),
        parent: obj,
        position,
        size: 40,
    })
}