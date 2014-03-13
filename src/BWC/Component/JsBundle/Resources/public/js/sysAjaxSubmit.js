$(function() {

    BWC.Dispatcher.addListener('sys.ajaxSubmit', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(e);
        var sysSubmitData = $dom.data('sysAjaxSubmit') || {};
        var $form = null;
        if (sysSubmitData.form) {
            $form = $(sysSubmitData.form);
        }
        if (!$form || !$form.length) {
            $form = $dom.closest('form');
        }
        if ($form.length) {
            $form = $form.first();
            var $parent = $form.parent();
            var options = {};
            if (sysSubmitData.options) {
                options = sysSubmitData.options;
            }
            if (!options.target) {
                options.target = $parent;
            }
            options.success = function() {
                BWC.Dispatcher.bind($parent.dom);
                if (typeof($form.unblock) == "function") {
                    $form.unblock();
                }
                $form.trigger('submitted.sys.ajaxSubmit', {
                    form: $form.dom,
                    originalEvent: ee
                });
                BWC.Dispatcher.dispatch('sys.ajaxSubmit.success', {
                    dom: $form.dom,
                    originalEvent: ee
                });
            }
            if (!options.dontBlock && typeof($form.block) == "function") {
                $form.block();
            }
            $form.ajaxSubmit(options);
        }
    })

})