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


    function load(ee, $dom) {
        var sysLoadData = $dom.data('sysLoad');
        var sysLoadDataData = $dom.data('sysLoadData');
        $(sysLoadData).each(function() {
            var targetData = this;

            if (!targetData.target) {
                throw new SyntaxError('No target');
            }
            var $target = $(targetData.target);
            if (!$target.length) {
                throw new SyntaxError('No element '+targetData.target);
            }

            var url = targetData.url;
            if (!url) {
                throw new SyntaxError('No url');
            }

            var options = targetData.ajax || {} ;
            options.url = targetData.url;
            options.data = options.data || {};

            if (sysLoadDataData) {
                for (var name in sysLoadDataData) {
                    options.data[name] = sysLoadDataData[name];
                }
            }

            if (targetData.data) {
                for (var name in targetData.data) {
                    var spec = targetData.data[name];
                    var method = spec[0];
                    var selector = spec[1];
                    $jq = $(selector);
                    var m = $jq[method];
                    var value = m.bind($jq)();
                    options.data[name] = value;
                }
            }

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
        });
    }

    var timer;

    BWC.Dispatcher.addListener('sys.load', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(e);

        var buffer = parseInt($dom.data('buffer'), 10);
        if (isNaN(buffer) || buffer < 1) buffer = 200;

        clearTimeout(timer);

        timer = setTimeout(function() {
            load(ee, $dom);
        }, buffer);

    });

});