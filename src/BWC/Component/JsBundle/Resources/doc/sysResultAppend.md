sys.result.append
=================

Appends body of loaded ajax object as HTML into specified target with jQuery append().

```
<button
    data-topic='{ "click": "sys.load", "loaded.bwc.sys.load": "sys.result.append" }'
    data-sys-url="/url/to/something"
    data-target="#element"
>do it</button

Options
-------

data-target
-----------

String. jQuery selector for the target element where to append body of loaded ajax result.
