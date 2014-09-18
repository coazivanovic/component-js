$(function() {

    BWC.Dispatcher.addListener('sys.block', function(e) {
        if (typeof($.blockUI) != "function") {
            throw new SyntaxError('malsup/blockUI not loaded');
        }

        var ee = e;
        var $dom = BWC.Dispatcher.getDom(ee);
        var sysBlockData = $dom.data('sysBlock') || [{}];

        $(sysBlockData).each(function() {
            var blockData = this;
            if (typeof blockData.target == 'undefined') {
                blockData.target = $dom.data('target');
            }
            if (blockData.target == '@self') {
                blockData.target = $dom;
            }
            if (blockData.target) {
                $(blockData.target).block(blockData.options);
            } else {
                $.blockUI(blockData.options);
            }
        });
    });

});