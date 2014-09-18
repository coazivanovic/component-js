sys.unblock
===========

Calls malsup unblock

``` html
<button
    data-topic='{ "click": "sys.unblock" }'
    data-sys-block='[ { "target": "#something" } ]'
```

Options
-------

data-sys-unblock
----------------

JSON array of objects with following properties

* target - jQuery selector to call unblock() on, if "@self" the dom that triggered the topic will be used, if omitted body will be used as target


Events
------

none
