sys.block
=========

Calls malsup block

``` html
<button
    data-topic='{ "click": "sys.block" }'
    data-sys-block='[ { "target": "#something", "options": { "message": null } } ]'
```

Options
-------

data-sys-block
--------------

JSON array of objects with following properties

* target - jQuery selector to call block() on, if "@self" the dom that triggered the topic will be used, if omitted body will be used as target


Events
------

none
