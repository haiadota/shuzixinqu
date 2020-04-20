const getUrl = (data) => {
    return `${defaultFilePath}/${data}`
}

THING.Utils.dynamicLoad([
    getUrl('file/lib/uearth.min.js'),
    getUrl('file/css/index.css'),
    getUrl('file/js/init.js'),
    getUrl('file/js/RoadLayer.js'),
    getUrl('file/js/XinQuKuaiLayer.js'),
    getUrl('file/js/BigBuildingLayer.js'),
    getUrl('file/js/addVideoLayer.js'),
    getUrl('file/js/addBarLayer.js'),
    getUrl('file/js/addFlyLineLayer.js'),

    getUrl('file/js/postMessage.js'),
], () => {
    createXinQuKuai()
    setTimeout(function () {
        initialView(function () {
            createRoadLayer()
            createBigBuildingLayer()
            addFlyLineLayer()
        })
    },1000)

    $('#dataAttribution').hide()
})