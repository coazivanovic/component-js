$(function() {


    function ajaxSuccess(targetData, $target, originalEvent, data, textStatus, jqXHR) {
        var result = BWC.Ajax.create(data);
        if (result.success) {
            var e = {result: result, originalEvent: originalEvent, abort: false };
            $target.trigger('load.bwc.sys.load', e);
            if (e.abort) {
                return;
            }

            $target.html(result.body);
            BWC.Dispatcher.bind($target);

            $target.trigger('loaded.bwc.sys.load', {result: result, originalEvent: originalEvent});

            $(targetData.onSuccess).each(function() {
                BWC.Dispatcher.dispatch(this, {
                    result: result,
                    originalEvent: ee,
                    targetData: targetData
                });
            });
        } else {
            $target.trigger('error.bwc.sys.load', {
                result: result,
                originalEvent: originalEvent,
                textStatus: textStatus,
                errorThrown: null
            });

            $(targetData.onFail).each(function() {
                BWC.Dispatcher.dispatch(this, {
                    result: result,
                    originalEvent: ee,
                    targetData: targetData,
                    textStatus: textStatus,
                    errorThrown: null
                });
            });
        }
    }


    function ajaxError(targetData, $target, jqXHR, textStatus, errorThrown) {
        $target.trigger('error.bwc.sys.load', {
            result: result,
            originalEvent: originalEvent,
            textStatus: textStatus,
            errorThrown: errorThrown
        });

        $(targetData.onFail).each(function() {
            BWC.Dispatcher.dispatch(this, {
                result: result,
                originalEvent: ee,
                targetData: targetData,
                textStatus: textStatus,
                errorThrown: errorThrown
            });
        });
    }

    function ajaxComplete(targetData, $target, data, textStatus, jqXHR) {
        if (typeof($target.unblock) == "function") {
            $target.unblock();
        }
    }

    BWC.Dispatcher.addListener('sys.load', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(e);
        var sysLoadData = $dom.data('sysLoad');
        $(sysLoadData).each(function() {
            var targetData = this;
            if (!targetData.target) {
                throw new SyntaxError('No target');
            }
            var $target = $(targetData.target);
            var url = targetData.url;
            if (!url) {
                throw new SyntaxError('No url');
            }
            if (!$target.length) {
                throw new SyntaxError('No element '+targetData.target);
            }

            var options = targetData.ajax;
            options.url = targetData.url;
            options.success = function(data, textStatus, jqXHR) {
                ajaxSuccess(targetData, $target, ee, data, textStatus, jqXHR);
            }
            options.error = function(data, textStatus, jqXHR) {
                ajaxError(targetData, $target, data, textStatus, jqXHR);
            }
            options.complete = function(data, textStatus, jqXHR) {
                ajaxComplete(targetData, $target, data, textStatus, jqXHR);
            }

            if (!targetData.dontBlock && typeof($target.block) == "function") {
                $target.block();
            }

            $.ajax(options);
        })
    });

});