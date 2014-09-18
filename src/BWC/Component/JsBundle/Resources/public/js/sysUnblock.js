$(function() {

    BWC.Dispatcher.addListener('sys.unblock', function(e) {
        if (typeof($.unblockUI) != "function") {
            throw new SyntaxError('malsup/blockUI not loaded');
        }

        var ee = e;
        var $dom = BWC.Dispatcher.getDom(ee);
        var sysUnblockData = $dom.data('sysUnblock') || [{}];

        $(sysUnblockData).each(function() {
            var unblockData = this;
            if (typeof unblockData.target == 'undefined') {
                unblockData.target = $dom.data('target');
            }
            if (unblockData.target == '@self') {
                unblockData.target = $dom;
            }
            if (unblockData.target) {
                $(unblockData.target).unblock(unblockData.options);
            } else {
                $.unblockUI(unblockData.options);
            }
        });
    });

});