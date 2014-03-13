$(function() {


    function ajaxSuccess(targetData, $target, originalEvent, data, textStatus, jqXHR) {
        var result = BWC.Ajax.create(data);
        if (result.success) {
            $target.trigger('load.bwc.sysLoad', {result: result, originalEvent: originalEvent});

            $target.html(result.body);
            BWC.Dispatcher.bind($target);

            $target.trigger('loaded.bwc.sysLoad', {result: result, originalEvent: originalEvent});

            $(targetData.onSuccess).each(function() {
                BWC.Dispatcher.dispatch(this, {
                    result: result,
                    originalEvent: ee,
                    targetData: targetData
                });
            });
        } else {
            $target.trigger('error.bwc.sysLoad', {result: result, originalEvent: originalEvent});

            $(targetData.onFail).each(function() {
                BWC.Dispatcher.dispatch(this, {
                    result: result,
                    originalEvent: ee,
                    targetData: targetData
                });
            })
        }
    }


    function ajaxError(targetData, $target, jqXHR, textStatus, errorThrown) {

    }

    function ajaxComplete(targetData, $target, data, textStatus, jqXHR) {
        $target.unblock();
    }

    BWC.Dispatcher.addListener('sys.load', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(e);
        var sysLoadData = $dom.data('sysLoad');
        $(sysLoadData).each(function() {
            var targetData = this;
            var $target = $(targetData.target);
            var url = targetData.url;

            var options = targetData.ajax;
            options.success = function(data, textStatus, jqXHR) {
                ajaxSuccess(targetData, $target, ee, data, textStatus, jqXHR);
            }
            options.error = function(data, textStatus, jqXHR) {
                ajaxError(targetData, $target, data, textStatus, jqXHR);
            }
            options.complete = function(data, textStatus, jqXHR) {
                ajaxComplete(targetData, $target, data, textStatus, jqXHR);
            }

            $target.block();

            $.ajax(targetData.url, options);
        })
    });

});