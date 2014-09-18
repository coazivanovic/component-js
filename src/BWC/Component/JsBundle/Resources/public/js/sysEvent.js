$(function() {

    BWC.Dispatcher.addListener('sys.event', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(ee);
        var sysEventData = $dom.data('sysEvent') || [{}];

        $(sysEventData).each(function() {
            var eventData = this;
            if (typeof eventData.event == 'undefined') {
                throw new SyntaxError('sys.event: No event specified');
            }
            BWC.Dispatcher.trigger(eventData.event, {
                trigger: $dom,
                data: eventData.data,
                originalEvent: ee
            });
        });
    });

});