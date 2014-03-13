$(function() {

    BWC.Dispatcher.addListener('bs.modal', function(e) {
        var ee = e;
        var $dom = BWC.Dispatcher.getDom(e);
        var url = $dom.data('url');
        $.ajax({
            url: url,
            success: function(data) {
                var result = BWC.Ajax.create(data);
                if (result.success) {
                    var $modal = $(result.body);
                    $('body').append($modal);
                    $modal.modal('show');
                    $modal.on('hidden.bs.modal', function() {
                        $(this).remove();
                    })
                } else {
                    alert('ERROR: '+result.message); // TODO
                }
            }
        })
    });

});