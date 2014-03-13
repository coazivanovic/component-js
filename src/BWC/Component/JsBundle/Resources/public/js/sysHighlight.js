$(function() {

    BWC.Dispatcher.addListener('sys.highlight', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(e);
        var sysHighlightData = $dom.data('sysHighlight');

        if (sysHighlightData && sysHighlightData.class) {
            if (sysHighlightData.selector) {
                $dom.closest(sysHighlightData.selector).find('[data-sys-highlight]').removeClass(sysHighlightData.class);
            }
            $dom.addClass(sysHighlightData.class);
        }

    });

});
