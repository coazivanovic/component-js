sys.result.html
===============

Puts body of loaded ajax object as HTML into specified target with jQuery html().

```
<button
    data-topic='{ "click": "sys.load", "loaded.bwc.sys.load": "sys.result.html" }'
    data-sys-url="/url/to/something"
    data-target="#element"
>do it</button

Options
-------

data-target
-----------

String. jQuery selector for the target element where to put body of loaded ajax result.
