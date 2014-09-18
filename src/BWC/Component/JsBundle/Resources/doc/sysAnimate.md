sys.animate
===========

Calls jQuery animate()

``` html
<button
    data-topic='{ "click": "sys.animate" }'
    data-sys-animate='[ { "data": {"height": "toggle"}, "duration": "500", "target": "#something" } ]'
```

Options
-------

data-sys-topic
--------------

JSON array of objects with following properties

* data - jQuery parameters object for animate method
* duration - jQuery duration parameter for animate method
* easing - jQuery easing parameter for animate method
* target - jQuery selector for elements to apply animate to, defaults to the node that triggered the event


Events
------

complete.sys.animate
--------------------

Triggered on dom that triggered the topic once the animate is completed.

