$(function() {


    function ajaxSuccess($dom, targetData, originalEvent, data, textStatus, jqXHR) {
        var result = BWC.Ajax.create(data);
        $dom.trigger('completed.bwc.sys.load', {
            result: result,
            originalEvent: originalEvent,
            targetData: targetData,
            jqXHR: jqXHR,
            textStatus: textStatus,
            errorThrown: null
        });
        if (result.success) {
            $dom.trigger('loaded.bwc.sys.load', {
                result: result,
                originalEvent: originalEvent,
                targetData: targetData,
                jqXHR: jqXHR,
                textStatus: textStatus,
                errorThrown: null
            });
        } else {
            $dom.trigger('error.bwc.sys.load', {
                result: result,
                originalEvent: originalEvent,
                targetData: targetData,
                jqXHR: jqXHR,
                textStatus: textStatus,
                errorThrown: null
            });
        }
    }


    function ajaxError($dom, targetData, jqXHR, textStatus, errorThrown) {
        $dom.trigger('error.bwc.sys.load', {
            result: null,
            originalEvent: null,
            targetData: targetData,
            jqXHR: jqXHR,
            textStatus: textStatus,
            errorThrown: errorThrown
        });
    }

    function ajaxComplete($block) {
        if ($block && typeof($block.unblock) == "function") {
            $block.unblock();
        }
        if (typeof($.unblockUI) == "function") {
            $.unblockUI();
        }
    }

    BWC.Dispatcher.addListener('sys.load', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(e);
        var sysLoadData = $dom.data('sysLoad');
        if (!sysLoadData) {
            sysLoadData = [{}];
        }
        $(sysLoadData).each(function() {
            var targetData = this;

            var url = targetData.url;
            if (!url) {
                targetData.url = $dom.data('url');
            }
            if (!targetData.url) {
                throw new SyntaxError('No url');
            }


            var $block = null;
            var block = targetData.block;
            if (block) {
                var blockOptions = targetData.blockOptions || {};
                if (block == true && typeof($.unblockUI) == "function") {
                    $.blockUI(blockOptions);
                } else {
                    $block = $(block);
                    if ($block.length && typeof($block.block) == "function") {
                        $block.block(blockOptions);
                    }
                }
            }

            var options = targetData.ajax || {};
            options.url = targetData.url;
            options.data = options.data || {};

            options.success = function(data, textStatus, jqXHR) {
                ajaxSuccess($dom, targetData, ee, data, textStatus, jqXHR);
            }
            options.error = function(data, textStatus, jqXHR) {
                ajaxError($dom, targetData, data, textStatus, jqXHR);
            }
            options.complete = function(data, textStatus, jqXHR) {
                ajaxComplete($block);
            }

            if (targetData.data) {
                for (var name in targetData.data) {
                    var method = targetData.data[name][0];
                    var selector = targetData.data[name][1];
                    var $jq = $(selector);
                    var m = $jq[method];
                    var value = m.bind($jq)();
                    options.data[name] = value;
                }
            }

            var buffer = targetData.buffer || 0;
            buffer = parseInt(buffer, 10);

            if (buffer < 1) {
                $.ajax(options);
            } else {
                var timer = $dom.data('sysTimer_'+ee.topic);
                clearTimeout(timer);
                timer = setTimeout(function() {
                    $.ajax(options);
                }, buffer);
                $dom.data('sysTimer_'+ee.topic, timer);
            }
        })
    });

});