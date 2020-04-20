class EventBus {
    constructor() {
        this.parentWindow = window.parent;
    }

    postMessage(obj) {
        if (obj && (typeof obj.type === 'string')) {
            this.parentWindow.postMessage(obj, '*');
        }
    }

    onEvent(eventType, callback) {
        this[eventType] = callback
    }

    emitEvent(eventType, data) {
        stopFlag = true
        count = 0
        clearLayer(eventType)
        if (this[eventType]) {
            this[eventType](data);
        }
    }
}

const eventBus = new EventBus();
window.addEventListener('message', function (event) {
    let obj = event.data;
    if (obj && (typeof obj.type === 'string')) {
        eventBus.emitEvent(obj.type, obj);
    }
}, false);

function clearLayer(eventType) {
    for (let i in HandleLayer) {
        if (eventType != i && HandleLayer[i]) {
            map.remove(HandleLayer[i]);
            HandleLayer[i] = null
        }
    }
    if (eventType == 'FlyToXinQu') {
        for (let i in CommonLayer) {
            if ('BigBuildingLayer' == i && CommonLayer[i]) {
                CommonLayer[i].visible = true;
            }
        }
        return
    }
    for (let i in CommonLayer) {
        if ('BigBuildingLayer' == i && CommonLayer[i]) {
            CommonLayer[i].visible = false;
        }
    }
}

eventBus.onEvent('FlyToXinQu', FlyToXinQu)
eventBus.onEvent('VideoLayer', addVideoLayer)
eventBus.onEvent('BarLayer', addBarLayer)
