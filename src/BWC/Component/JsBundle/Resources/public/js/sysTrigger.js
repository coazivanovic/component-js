$(function() {

    BWC.Dispatcher.addListener('sys.trigger', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(ee);
        var sysTriggerData = $dom.data('sysTrigger') || [{}];

        $(sysTriggerData).each(function() {
            var triggerData = this;
            if (typeof triggerData.event == 'undefined') {
                throw new SyntaxError('sys.event: No event specified');
            }
            if (typeof triggerData.target == 'undefined') {
                triggerData.target = $dom;
            }
            $(triggerData.target).trigger(triggerData.event, {
                originalEvent: ee,
                dom: $dom,
                data: triggerData
            });
        });
    });

});