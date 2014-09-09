$(function() {

    BWC.Dispatcher.addListener('sys.toggleClass', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(ee);
        var sysToggleClassData = $dom.data('sysToggleClass') || [{}];

        $(sysToggleClassData).each(function() {
            var targetData = this;
            if (typeof targetData.class == "undefined") {
                targetData.class = $dom.data('class');
            }
            if (!targetData.class) {
                throw new SyntaxError('sys.addClass: No class specified');
            }

            var $target = $(ee.dom);
            if (targetData.target) {
                $target = $(targetData.target);
                if ($target.length < 1) {
                    throw new SyntaxError('sys.addClass: Invalid target: '+targetData.target);
                }
            }

            if (typeof targetData.parent == "undefined") {
                targetData.parent = $dom.data('parent');
            }
            if (targetData.parent) {
                // radio button mode
                var $parent = $(targetData.parent);
                if ($parent.length < 1) {
                    throw new SyntaxError('sys.addClass: Invalid parent: '+targetData.parent);
                }
                var $children = $parent.children();
                if (targetData.children) {
                    $children = $parent.find(targetData.children);
                }
                $children.removeClass(targetData.class);
                $target.addClass(targetData.class);
            } else {
                // checkbox mode
                var hasClass = $target.hasClass(targetData.class);
                if (hasClass) {
                    $target.removeClass(targetData.class);
                } else {
                    $target.addClass(targetData.class);
                }
            }
        });
    });

});