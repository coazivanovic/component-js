sys.load
========

``` html
<div data-id="target1"></div>
...
<div data-id="target2"></div>
...
<button
    data-topic='{ "click": "sys.load" }'
    data-sys-load='[
        { "target": "[data-id=\"target1\"]", "url": "/url/first" },
        { "target": "[data-id=\"target2\"]", "url": "/url/second" }
    ]'
>do it</button
```

Options
-------

data-sys-load
-------------

Array. Required. Array of target objects with fields:

**target**
String. Required. jQuery selector for the target element to be loaded

**url**
String. Required. Url to load the target from

**ajax**
Object. Optional. The $.ajax() options object, overwritten with url, success, error, complete

**onSuccess**
String or array of strings. Optional. Topic(s) to trigger on successful loading of the target

**onFail**
String or array of strings. Optional. Topic(s) to trigger on error loading of the target

**dontBlock**
Boolean. Optional. Default false. If true before submit $target.block() is called and on complete
$target.unblock(). Works only if malsup/blockui is laoded.


Exceptions
----------

**SyntaxError**
* if required target option *url* not specified
* if required target option *target* not specified
* if no dom element with *target* selector found


Events
--------

**load.bwc.sys.load**
On: the target element before it's loaded with new content
Options:
* result - ajax result object used to load the element
* originalEvent - the sys.submit.ajax topic handler event
* abort - default false - if set to true with the event handler content load is aborted

**loaded.bwc.sys.load**
On: the target element before it's loaded with new content
* result - ajax result object used to load the element
* originalEvent - the sys.submit.ajax topic handler event

**error.bwc.sys.load**
On: the target element
* result - ajax result object used to load the element
* originalEvent - the sys.submit.ajax topic handler event


Topics
------

**sys.submit.ajax.success**
Options:
* dom - the element that triggered the sys.submit.ajax topic
* target - the target element form submision was loaded to
* form - the loaded form wrapper in jQuery
* originalEvent - the sys.submit.ajax topic handler event

