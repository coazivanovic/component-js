$(function() {

    function ajaxSuccess(bsModalData, ee, $dom, data, textStatus, jqXHR) {
        var result = BWC.Ajax.create(data);
        if (result.success) {
            var $modal = $(result.body);
            $('body').append($modal);
            BWC.Dispatcher.bind($modal.dom);
            $modal.modal('show');
            $modal.on('hidden.bs.modal', function() {
                $(this).remove();
            });

            $dom.trigger('shown.bwc.bs.modal', {
                dom: $dom.dom,
                result: result,
                originalEvent: ee,
                textStatus: null,
                errorThrown: null
            });

            BWC.Dispatcher.dispatch('bs.modal.shown', {
                result: result,
                originalEvent: ee,
                modal: $modal
            });

        } else {
            $dom.trigger('error.bwc.bs.modal', {
                dom: $dom.dom,
                result: result,
                originalEvent: ee,
                textStatus: null,
                errorThrown: null
            });
            BWC.Dispatcher.dispatch('bs.modal.error', {
                dom: $dom.dom,
                result: result,
                originalEvent: ee,
                textStatus: null,
                errorThrown: null
            });
        }
    }

    function ajaxError(bsModalData, ee, $dom, jqXHR, textStatus, errorThrown) {
        $dom.trigger('error.bwc.bs.modal', {
            dom: $dom.dom,
            result: null,
            originalEvent: ee,
            textStatus: textStatus,
            errorThrown: errorThrown
        });
        BWC.Dispatcher.dispatch('bs.modal.error', {
            dom: $dom.dom,
            result: null,
            originalEvent: ee,
            textStatus: null,
            errorThrown: null
        });
    }

    function ajaxComplete(bsModalData, ee, $dom, jqXHR, textStatus) {

    }


    BWC.Dispatcher.addListener('bs.modal', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(e);
        var bsModalData = $dom.data('bsModal') || {};
        if (!bsModalData || !bsModalData.url) {
            bsModalData.url = $dom.data('url');
        }
        if (!bsModalData.url) {
            throw new SyntaxError('No url');
        }
        var options = bsModalData.ajax || {};
        options.url = bsModalData.url;
        options.success = function(data, textStatus, jqXHR) {
            ajaxSuccess(bsModalData, ee, $dom, data, textStatus, jqXHR);
        }
        options.error = function(jqXHR, textStatus, errorThrown) {
            ajaxError(bsModalData, ee, $dom, jqXHR, textStatus, errorThrown);
        }
        options.complete = function(jqXHR, textStatus) {
            ajaxComplete(bsModalData, ee, $dom, jqXHR, textStatus);
        }
        $.ajax(options);
    });

});