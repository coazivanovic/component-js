$(function() {

    BWC.Dispatcher.addListener('sys.submit.ajax', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(e);
        var sysSubmitData = $dom.data('sysSubmitAjax') || $dom.data('sysSubmit') || {};
        var $form = null;
        if (sysSubmitData.form) {
            $form = $(sysSubmitData.form);
        } else {
            $form = $dom.closest('form');
        }
        if (!$form || !$form.length) {
            throw new SyntaxError('No form');
        }
        if ($form.length) {
            $form = $form.first();
            var options = sysSubmitData.options || {};
            if (!options.target) {
                options.target = $form;
                options.replaceTarget = true;
            }
            var $target = $(options.target);
            options.success = function(response, statusText, jqXHR, jqForm) {
                BWC.Dispatcher.bind($target.dom);
                if (typeof($form.unblock) == "function") {
                    $form.unblock();
                }
                $dom.trigger('submitted.bwc.sys.submit.ajax', {
                    trigger: $dom,
                    target: $target,
                    form: jqForm,
                    originalEvent: ee
                });
                jqForm.trigger('loaded.bwc.sys.submit.ajax', {
                    trigger: $dom,
                    target: $target,
                    form: jqForm,
                    originalEvent: ee
                });
                BWC.Dispatcher.dispatch('sys.submit.ajax.success', {
                    dom: $dom.dom,
                    target: $target,
                    form: $form,
                    originalEvent: ee
                });
            }
            if (!sysSubmitData.dontBlock && typeof($target.block) == "function") {
                $target.block();
            }
            $form.ajaxSubmit(options);
        }
    })

})