// 创建App
// var app = new THING.App({'env': 'Seaside'});
var app = new THING.App();
// 天空默认效果
app.background = [0, 0, 0];
//天空盒
app.skyBox = [getUrl('file/img/sky/black_up.jpg'), getUrl('file/img/sky/black_rt.jpg'), getUrl('file/img/sky/black_lf.jpg'),
    getUrl('file/img/sky/black_fr.jpg'),
    getUrl('file/img/sky/black_dn.jpg'), getUrl('file/img/sky/black_bk.jpg')
];
// var day = new Date()
// var time = day.getHours() + day.getMinutes() / 60
// var effect = {
//     turbidity: 10, // 光源扩散大小
//     rayleigh: 2, // 大气散射
//     time, // 时间 [0~24]
//     beta: 120, // 水平角度
// };
// app.skyEffect = effect;
var map = app.create({
    type: 'Map',
    attribution: 'Google',
    backgroundColor: [0, 0, 0],
    atmosphere: false, // 关闭大气
    style: {
        fog: false, // 关闭雾的效果
        night: false,
    },
});
// 创建一个瓦片图层
var tileLayer1 = app.create({
    type: 'TileLayer',
    name: 'tileLayer1',
    url: 'http://mt0.google.cn/vt/lyrs=m&x={x}&y={y}&z={z}',
    style: {
        // template: CMAP.TileLayerStyle.DARKGREEN // 设置瓦片图层的样式为DARKGREEN
        'brightness': 1,
        'template': CMAP['TileLayerStyle']['CUSTOMCOLOR'],
        'customColor': [255, 255, 255, 1],
        'grayFilterEnable': !![],
        'grayFilterColorBar': [[0, 12, 43, 1], [129, 150, 173, 1], [0, 28, 55, 1]],
        'grayFilterPerBar': [0, 0.72, 1]
    }
});
// 将瓦片图添加到地图中
map.addLayer(tileLayer1);



const CommonLayer = {} // 基础图层
const HandleLayer = {} // 操作图层

// 飞到地理位置和高度
function initialView(callback) {
    app.camera.flyTo({
        'position': [2664140.955653193, 4410979.364325156, 3771327.5821610363],
        'target': [2657735.082461573, 4416001.0701578, 3756895.361252309],
        time: 3000,
        complete: function () {
            if (callback) callback()
        }
    });
}

function FlyToXinQu(data, callback) {
    console.log(data.data)
    let position = []
    let target = []
    switch (data.data) {
        case "ToGaoXin":
            position = [2656122.70069064, 4414694.872665167, 3760382.4067814583]
            target = [2655712.5927825314, 4415318.309505088, 3759127.383181874]
            break
        case "ToBeiHu":
            position = [2659481.49178537, 4426791.319568968, 3743837.1913328525]
            target = [2659026.270814238, 4427455.714793754, 3742472.320929061]
            break
        case "ToChangDe":
            position = [2672407.056156272, 4426241.252398516, 3743082.345686205]
            target = [2665843.9265675363, 4430026.029828362, 3734572.1191142937]
            break
        case "ToKongGang":
            position = [2688300.249115346, 4430403.263514661, 3742080.056555711]
            target = [2677189.111990943, 4435536.123362353, 3719887.3293197025]
            break
        default:
            return
    }
    app.camera.flyTo({
        'position': position,
        'target': target,
        time: 4000,
        complete: function () {
            app.camera.flyRotatePoint({
                target: app.camera.target,
                angle: 0,
                time: 7 * 1000,
                complete: () => {
                    if (callback) {
                        callback()
                    }
                }
            });

        }
    });
    // app.camera.flyTo({
    //     'position': [2662940.38218355, 4432443.540183288, 3760513.7261758703],
    //     'target': [2655663.7131838067, 4422647.699960227, 3750536.166881102],
    //     time: 3000,
    //     complete: function () {
    //
    //     }
    // });
}

// 无操作飞行
var count = 0;
var outTime = 20;//秒
var xunyouIndex = 4
var xinQuName = ["ToKongGang", "ToChangDe", "ToBeiHu", "ToGaoXin"]
window.setInterval(go, 1000);
stopFlag = false

function xunyou() {
    if (stopFlag) {
        return
    }
    xunyouIndex--
    FlyToXinQu({data: xinQuName[xunyouIndex]}, xunyou)
    if (!xunyouIndex) {
        xunyouIndex = 4
    }
}

function go() {
    count++;
    console.log(count)
    if (count == outTime) {
        stopFlag = false
        xunyou()
    } else if (count == 72) {
        count = 16
        stopFlag = true
    }
}

var x;
var y;
//监听鼠标
document.onmousemove = function (event) {
    var x1 = event.clientX;
    var y1 = event.clientY;
    if (x != x1 || y != y1) {
        count = 0;
        stopFlag = true
    }
    x = x1;
    y = y1;
};

//监听键盘
document.onkeydown = function () {
    count = 0;
    stopFlag = true
};

const campusArr = [
    {
        url: '/api/scene/f7d790e83a76ab19ae20a5d6',
        sceneLonlat: [125.2864000000, 43.8288200000],
        angles: 180
    }
]
CampusLayer = null

function loadCampus() {
    CampusLayer = app.create({
        type: 'ThingLayer',
        name: 'polygonLayer'
    });
    campusArr.forEach(function (item) {
        const position = CMAP.Util.convertLonlatToWorld(item.sceneLonlat, 0.5)
        // 计算园区在地球上的旋转角度，第二个参数可以调整,对园区在地球表面进行旋转
        const angles = CMAP.Util.getAnglesFromLonlat(item.sceneLonlat, item.angles);
        let preCampus = app.create({
            type: 'Campus',
            name: '工厂',
            url: item.url, // 园区地址
            position, // 位置
            angles, // 旋转
        });
        CampusLayer.add(preCampus)
    })
    map.addLayer(CampusLayer)
}



