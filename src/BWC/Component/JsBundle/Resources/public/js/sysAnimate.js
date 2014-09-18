$(function() {

    BWC.Dispatcher.addListener('sys.animate', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(ee);
        var sysAnimateData = $dom.data('sysAnimate') || [{}];

        $(sysAnimateData).each(function() {
            var animateData = this;
            if (typeof animateData.data == 'undefined') {
                throw new SyntaxError('sys.animate: No data specified');
            }
            if (typeof animateData.target == 'undefined') {
                animateData.target = ee.dom;
            }
            if (typeof animateData.duration == 'undefined') {
                animateData.duration = 400;
            }
            if (typeof animateData.easing == 'undefined') {
                animateData.easing = 'swing';
            }
            $(animateData.target).animate(
                animateData.data,
                animateData.duration,
                animateData.easing,
                function() {
                    $dom.trigger('complete.sys.animate', {
                        trigger: $dom,
                        data: animateData,
                        originalEvent: ee
                    });
                }
            );
        });
    });

});