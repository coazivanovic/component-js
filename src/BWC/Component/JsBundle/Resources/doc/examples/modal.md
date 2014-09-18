Showing a bootstrap modal
=========================

``` html
<button
    data-topic='{ "click": "bs.modal" }'
    data-bs-modal='{ "url": "modal.html", "block": "true" }'
```

``` php
// modal.html
<div class="modal fade role="dialog" aria-labeledby="xModalLabel" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="xModelLabel">Title</h4>
            </div>
            <div class="modal-body">
                <h2>Hello World!</h2>
            </div>
            <div class="modal-footer" {% block modal_footer_attributes %}{% endblock %}>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">OK</button>
            </div>
        </div>
    </div>
</div>
```

