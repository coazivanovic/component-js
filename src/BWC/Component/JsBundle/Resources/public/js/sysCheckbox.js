$(function() {

    BWC.Dispatcher.addListener('sys.checkbox', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(ee);
        var arrSysCheckboxData = $dom.data('sysCheckbox') || {};

        $(arrSysCheckboxData).each(function() {
            var sysCheckboxData = this;
            if (typeof sysCheckboxData.target == "undefined") {
                sysCheckboxData.target = $dom.data('target');
            }
            if (!sysCheckboxData.target) {
                throw new SyntaxError('sys.checkbox: No target');
            }

            if (typeof sysCheckboxData.value == "undefined") {
                sysCheckboxData.value = $dom.data('value');
            }

            if (typeof sysCheckboxData.value != "string") {
                sysCheckboxData.value = sysCheckboxData.value ? true : false
            } else if (sysCheckboxData.value != "toggle" && sysCheckboxData.value != "copy") {
                throw new SyntaxError("sys.checkbox: Invalid value "+sysCheckboxData.value);
            }

            $target = $(sysCheckboxData.target);
            $target.each(function() {
                var $this = $(this);
                if (sysCheckboxData.value == "toggle") {
                    $this.prop('checked', !$this.prop('checked'));
                } else if (sysCheckboxData.value == "copy") {
                    $this.prop('checked', $dom.prop('checked'));
                } else {
                    $this.prop('checked', sysCheckboxData.value);
                }
            });
        });


    });

});