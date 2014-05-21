if (typeof BWC == 'undefined') BWC = {};

BWC.Dispatcher = {
    listeners: []
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
            if(topic.replace(/[^\[\]]/g, '') != '') {
                var topic = topic.replace(/[\[\]]/g, '');
                if(topic.match(this.topic)){
                    return true;
                }
            }
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


BWC.Dispatcher.bind = function(dom) {
    if (!dom) dom = document;

    var fnStopPropagation = function(ev) { ev.stopPropagation() };
    var fnDispatch = function(ev, extra) {
        if (ev.data.stopPropagation) {
            ev.stopPropagation();
        }
        BWC.Dispatcher.dispatchDomEvent(ev.data.topic, ev, extra);
    };

    $('[data-topic]').each(function() {
        var self = this;
        var $self = $(self);
        var topicData = $self.data('topic');

        var hasStopPropagation = $self.data('stopPropagation');
        hasStopPropagation = hasStopPropagation === true || hasStopPropagation == "true";

        for (eventName in topicData) {

            if (!hasStopPropagation) {
                var parents = $self.parents('[data-stop-propagation="true"]');
                if (parents.length) {
                    parents.off(eventName);
                    parents.on(eventName, fnStopPropagation);
                }
            }
            $self.off(eventName);

            var arrTopics = topicData[eventName];
            if (typeof arrTopics == 'string') arrTopics = [arrTopics];
            for (var i in arrTopics) {
                var topicName = arrTopics[i];
                $self.on(
                    eventName,
                    null,
                    {
                        topic: topicName,
                        stopPropagation: hasStopPropagation
                    },
                    fnDispatch
                );

            }
        }
    });



}
