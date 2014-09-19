sys.trigger
=========

Triggers dom event with specified name on specified dom target

``` html
<button
    data-topic='{ "click": "sys.trigger" }'
    data-sys-trigger='[ { "event": "click", "target": "#something" } ]'
```

Options
-------

data-sys-trigger
----------------

JSON array of objects with following properties:

* event - String. Required. Name of the event to trigger topics for
* target - String. jQuery selector for the elements to trigger event on. If omitted dom that triggered the topic is taken

