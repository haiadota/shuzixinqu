function addFlyLineLayer() {
    if (HandleLayer.FlyLineLayer) {
        map.remove(HandleLayer.FlyLineLayer);
        HandleLayer.FlyLineLayer.destroy()
        HandleLayer.FlyLineLayer = null
        return
    }
    HandleLayer.FlyLineLayer = app.create({
        type: 'ThingLayer',
        name: 'FlyLineLayer'
    });
    map.addLayer(HandleLayer.FlyLineLayer);
    $.ajax({
        type: 'GET',
        url: getUrl('file/data/xinqukuai.geojson'),
        dataType: 'json',
        success: function (data) {
            let flyLine = app.create({
                type: 'GeoFlyLine',
                id: 'geoFlyLine',
                name: 'geoFlyLine',
                coordinates: [[125.438549, 43.986606],[125.338993, 43.978647]],//注 飞线的坐标只可以有两个点
                renderer:{
                    type: 'image', //GeoFlyLine渲染类型 支持纯色(vector)和贴图(image)两种模式
                    lineType: 'Pipe', //可以是Line Plane Pipe
                    imageUrl:getUrl("file/img/lan.png"),//线的贴图url
                    // color:[255,255,255], //线的颜色,如果设置此项，imageUrl会失效
                    // effect:true, //是否开启发光特效
                    width: 20, //只在线类型为Plane,Pipe下生效,代表线的宽度
                    numPass:1, // 通道数,在贴图时贴图叠加的次数,次数越多颜色越亮,尽在
                    speed:1  //线贴图流动速度,默认是0,不流动 speed可以大于0也可以小于0，代表流动方向
                }
            });
            HandleLayer.FlyLineLayer.add(flyLine);
        }
    });
}
