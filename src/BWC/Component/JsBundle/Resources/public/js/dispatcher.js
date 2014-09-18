if (typeof BWC == 'undefined') BWC = {};

BWC.Dispatcher = {
    listeners: [], // id => { id: int, callback: function, scope: object, topic: string }
    events: {}     // eventName: dom[]
};

/**
 * @param {object} e  BWC.Dispatcher topic handler event object
 * @returns {jQuery}
 */
BWC.Dispatcher.getDom = function(e) {
    if (!e.dom) {
        throw new SyntaxError('Missing dom');
    }
    var $dom = $(e.dom);
    return $dom;
}


BWC.Dispatcher.addListener  = function(topic, callback, scope) {
    var id = this.listeners.length;
    var obj = {
        id: id,
        callback: callback,
        scope: scope,
        topic: topic,
        matchTopic: function(topic) {
            if(this.topic == topic) return true;
            return false;
        }
    };
    var id = this.listeners.length;
    this.listeners[id] = obj;

    return id;
}

BWC.Dispatcher.dispatch = function(topic, data) {
    if (typeof data != 'object'){
        data = {};
    }
    data.topic = topic;
    data.cancel = false;

    if (data.dom) {
        data.ctx = {};
        var dataObj = $(data.dom).data();
        for (var name in dataObj) {
            if (name.substr(0, 3) == 'ctx') {
                data.ctx[name.substr(3)] = dataObj[name];
            }
        }
    }

    for (var id in this.listeners) {
        var entity = this.listeners[id];
        if (entity.matchTopic(topic)) {
            if (entity.scope) {
                entity.callback.bind(entity.scope)(data);
            } else {
                entity.callback(data);
            }
            if (data && data.cancel) {
                break;
            }
        }
    }
}

BWC.Dispatcher.dispatchDomEvent = function(topic, event, extra) {
    var ctx = {
        dom: event.currentTarget,
        event: event,
        extra: extra
    };
    BWC.Dispatcher.dispatch(topic, ctx);
}


BWC.Dispatcher.bind = function() {
    var fnDispatch = function(ev, extra) {
        ev.stopPropagation();
        BWC.Dispatcher.dispatchDomEvent(ev.data.topic, ev, extra);
    };

    BWC.Dispatcher.events = {};

    $('[data-topic]').each(function() {
        var self = this;
        var $self = $(self);
        var topicData = $self.data('topic');

        for (eventName in topicData) {

            $self.off(eventName);
            if (typeof BWC.Dispatcher.events[eventName] == "undefined") {
                BWC.Dispatcher.events[eventName] = [];
            }
            BWC.Dispatcher.events[eventName].push(self);

            var arrTopics = topicData[eventName];
            if (typeof arrTopics == 'string') arrTopics = [arrTopics];
            for (var i in arrTopics) {
                var topicName = arrTopics[i];
                $self.on(
                    eventName,
                    null,
                    {
                        topic: topicName
                    },
                    fnDispatch
                );

            }
        }
    });


    BWC.Dispatcher.trigger = function(eventName, data) {
        if (typeof BWC.Dispatcher.events[eventName] == "undefined") {
            return;
        }

        for (var i in BWC.Dispatcher.events[eventName]) {
            $(BWC.Dispatcher.events[eventName][i]).trigger(eventName, data);
        }
    }
}
