$(function() {

    BWC.Dispatcher.addListener('sys.toggleClass', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(ee);
        var sysToggleClassData = $dom.data('sysToogleClass') || {};

        if (typeof sysToggleClassData.class == "undefined") {
            sysToggleClassData.class = $dom.data('class');
        }
        if (!sysToggleClassData.class) {
            throw new SyntaxError('sys.addClass: No class specified');
        }

        var $target = $(ee.dom);
        if (sysToggleClassData.target) {
            $target = $(sysToggleClassData.target);
            if ($target.length < 1) {
                throw new SyntaxError('sys.addClass: Invalid target: '+sysToggleClassData.target);
            }
        }

        if (typeof sysToggleClassData.parent == "undefined") {
            sysToggleClassData.parent = $dom.data('parent');
        }
        if (sysToggleClassData.parent) {
            // radio button mode
            var $parent = $(sysToggleClassData.parent);
            if ($parent.length < 1) {
                throw new SyntaxError('sys.addClass: Invalid parent: '+sysToggleClassData.parent);
            }
            var $children = $parent.children();
            if (sysToggleClassData.children) {
                $children = $parent.find(sysToggleClassData.children);
            }
            $children.removeClass(sysToggleClassData.class);
            $target.addClass(sysToggleClassData.class);
        } else {
            // checkbox mode
            var hasClass = $target.hasClass(sysToggleClassData.class);
            if (hasClass) {
                $target.removeClass(sysToggleClassData.class);
            } else {
                $target.addClass(sysToggleClassData.class);
            }
        }
    });

});