var marker;

function addVideoLayer() {
    initialView()
    if (HandleLayer.VideoLayer) {
        map.remove(HandleLayer.VideoLayer);
        HandleLayer.VideoLayer.destroy()
        HandleLayer.VideoLayer = null
        return
    }
    HandleLayer.VideoLayer = app.create({
        type: 'ThingLayer',
        name: 'polygonLayer'
    });
    map.addLayer(HandleLayer.VideoLayer);
    var url = getUrl('file/data/shipinjiankong.geojson')
    $.ajax({
        'type': 'GET',
        'url': url,
        'dataType': 'json',
        'success': function (data) {
            for (var i = 0; i < data.features.length; i++) {
                let geoPoint = app.create({
                    type: 'GeoPoint',
                    id: data.features[i].id,
                    coordinates: data.features[i].geometry.coordinates,
                    renderer: {
                        type: 'image', // image 代表使用图片
                        url: getUrl('file/img/cameraPoint.png'), // 图片 url
                        size: 400,  // 缩放比例
                        keepSize: false // 图标近大远小
                    }
                });
                HandleLayer.VideoLayer.add(geoPoint);// 将一个点加到ThingLayer中
                geoPoint.on('click',function(e){
                    addModelMarker(e.object, 10,'//img.tukuppt.com/video_show/8321488/00/14/45/5e4e50f7cdaba.mp4');
                })
            }
        }
    });
}

const createEle = function (data, id) {
    const div = document.createElement('div');
    div.innerHTML =
        `<div class="videoBox">
            <div class="txt">${id}</div>
            <div class="video_wrap">
                <video autoplay="autoplay" class="main" src="${data}"></video>
            </div>
        </div>`;
    return div;
}
const addModelMarker = function (obj, height, data) {
    if(marker){
        if(obj.id == marker.id){
            marker.destroy()
            marker = null
            return
        } else{
            marker.destroy()
            marker = null
        }
    }
    // 获取中心点坐标
    const position = map.util.convertLonlatToWorld(obj.coordinates, height*160);
    marker = app.create({
        type: 'Marker',
        id: obj.id,
        element: createEle(data, obj.id),
        parent: obj,
        position,
        size: 60,
        // keepSize:true
    })
}