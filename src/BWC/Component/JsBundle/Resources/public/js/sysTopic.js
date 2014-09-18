$(function() {

    BWC.Dispatcher.addListener('sys.topic', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(ee);
        var sysTopicData = $dom.data('sysTopic') || [{}];

        $(sysTopicData).each(function() {
            var topicData = this;
            if (typeof topicData.topic == 'undefined') {
                throw new SyntaxError('sys.topic: No topic specified');
            }
            BWC.Dispatcher.dispatch(topicData.topic, {
                dom: $dom,
                originalEvent: ee,
                data: topicData
            });
        });
    });

});