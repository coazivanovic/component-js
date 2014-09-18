sys.event
=========

Triggers topics on all elements subscribed for specified event

``` html
<button
    data-topic='{ "click": "sys.event" }'
    data-sys-event='[ { "event": "something.happened" } ]'
```

Options
-------

data-sys-event
--------------

JSON array of objects with following properties:

* event - name of the event to trigger topics for

