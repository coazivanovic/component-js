$(function() {

    BWC.Dispatcher.addListener('bs.modal.hide', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(e);
        var bsModalHideData = $dom.data('bsModalHide') || {};
        if (!bsModalHideData.target) {
            bsModalHideData.target = $dom.data('target');
        }
        var $modal = $(bsModalHideData.target);
        if (!$modal.length) {
            $modal = $dom.closest('.modal');
        }
        if (!$modal.length) {
            throw new SyntaxError('No modal');
        }

        $modal.modal('hide');
    });

});