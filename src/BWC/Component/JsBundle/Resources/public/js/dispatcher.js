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

BWC.Dispatcher.Listener = function(id, callback, scope){
    var listener = Object.create({
        _id: null,
        _topic: null,
        _callback: null,
        _scope: null,

        init: function (id, callback, scope){
            if(typeof id == 'undefined') throw new Error('Id of Listener must be defined');
            this._setId(id);
            this._callback = callback;
            this._scope = scope;
        },

        _setId: function (id){
            this._id = id;
        }
    });

    listener.init(id, callback, scope);

    this.setTopic = function(topic){
        if(typeof topic == 'undefined') throw new Error('Topic must be defined');
        listener._topic = topic;
        return this;
    };

    this.getTopic = function(){
        return listener._topic;
    };

    this.getId = function(){
        return listener._id;
    }

    this.getScope = function(){
        return listener._scope;
    }

    this.matchTopic = function(topic){
        if(listener._topic == topic) return true;
        if(topic.replace(/[^\[\]]/g, '') != ''){
            var topic = topic.replace(/[\[\]]/g, '');
            if(topic.match(listener._topic)){
                return true;
            }
        }
        return false;
    }

    this.getCallback = function(){
        return listener._callback;
    }

    return this;
};

BWC.Dispatcher.addListener  = function(topic, callback, scope) {

    var id = this.listeners.length;
    var obj = new BWC.Dispatcher.Listener(id, callback, scope);
    obj.setTopic(topic);
    var id = this.listeners.length;
    this.listeners[id] = obj;

    return id;
}

BWC.Dispatcher.dispatch = function(topic, data) {
    if (typeof data != 'object'){
        data = {};
        data.isPropagationStopped = true;
    }
    data.topic = topic;

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
            if (entity.getScope()) {
                entity.getCallback().bind(entity.getScope)(data);
            } else {
                entity.getCallback()(data);
            }
            if (data && data.isPropagationStopped) {
                break;
            }
        }
    }
}

BWC.Dispatcher.dispatchDomEvent = function(topic, event) {
    var ctx = {
        dom: event.currentTarget,
        event: event,
        isPropagationStopped: event.data.stopPropagation
    };
    BWC.Dispatcher.dispatch(topic, ctx);
}


BWC.Dispatcher.bind = function(dom) {
    if (!dom) dom = document;

    var fnStopPropagation = function(ev) { ev.stopPropagation() };
    var fnDispatch = function(ev) {
        if (ev.data.stopPropagation) {
            ev.stopPropagation();
        }
        BWC.Dispatcher.dispatchDomEvent(ev.data.topic, ev);
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

    return;

    // ------------------------------



    jqTopics.each(function() {
        var self = this;
        var $self = $(self);
        var topicData = $self.data('topic');
        for (eventName in topicData) {
            var arrTopics = topicData[eventName];
            if (typeof arrTopics == 'string') arrTopics = [arrTopics];
            $self.off(eventName, null, fnDispatch);
        }
    });

    var arrEvents = [
        'blur',
        'change', 'click',
        'dblclick',
        'focus', 'focusin', 'focusout',
        'hover',
        'keydown', 'keypress', 'keyup',
        'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup',
        'resize',
        'scroll', 'select',
        'toggle'
    ];
    $('[data-stop-propagation="true"]').each(function() {
        var self = this;
        var $self = $(self);
        for (var idx in arrEvents) {
            var eventName = arrEvents[idx];
            $self.off(eventName, null, fnStopPropagation);
            $self.on(eventName, fnStopPropagation);
        }
    });


    jqTopics.each(function() {
        var self = this;
        var $self = $(self);
        var topicData = $self.data('topic');

        for (eventName in topicData) {
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


}
