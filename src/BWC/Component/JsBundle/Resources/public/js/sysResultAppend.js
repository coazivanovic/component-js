$(function() {

    BWC.Dispatcher.addListener('sys.result.append', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(ee);
        var target = $dom.data('target');
        if (!target) {
            target = ee.target;
        }
        if (!target) {
            throw new SyntaxError('sys.result.append: No target');
        }
        var $target = $(target);
        if ($target.length < 1) {
            throw new SyntaxError('sys.result.append: Target not found: '+target);
        }

        var result = ee.extra.result;
        if (!result) {
            throw new SyntaxError("sys.result.html: Missing result");
        }
        if (typeof result.body == "undefined") {
            throw new SyntaxError("sys.result.append: No result body");
        }

        $target.append(result.body);
    });

});