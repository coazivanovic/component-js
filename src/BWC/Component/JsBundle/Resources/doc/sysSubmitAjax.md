sys.submit.ajax
===============

``` html
<form>
    <button
        data-topic='{ "click": "sys.submit.ajax" }'
        data-sys-submit-ajax='{}'
    >Submit</button
</form>
```

Requiers mlsup/form

The triggering dom element could be outside of the form and in that case *form* data option should be specified.
In case *form* data option is not specified closest ```form``` element is used.


Options
-------

data-sys-submit-ajax
--------------------

Object. Optional. If attribute ```data-sys-submit-ajax``` is not found then ```data-sys-submit``` is used.

**form**
String. Optional. Default closest ```form```. jQuery selector for the form to submit.

**options**
Object. Optional. mlsup/form options overwritten with target and success.

**dontBlock**
Boolean. Optional. Default false. If true before submit $parent.block() is called and on complete
$parent.unblock(). Works only if malsup/blockui is laoded.


Exceptions
----------

**SyntaxError**
* if no form


Events
--------

**submitted.bwc.sys.submit.ajax**
On: element that triggered the sys.submit.ajax topic
Options:
* trigger - the element that triggered the sys.submit.ajax topic
* target - the target element form submision was loaded to
* form - the loaded form wrapper in jQuery
* originalEvent - the sys.submit.ajax topic handler event

**loaded.bwc.sys.submit.ajax**
On: the loaded form
Options:
* trigger - the element that triggered the sys.submit.ajax topic
* target - the target element form submision was loaded to
* form - the loaded form wrapper in jQuery
* originalEvent - the sys.submit.ajax topic handler event


Topics
------

**sys.submit.ajax.success**
Options:
* dom - the element that triggered the sys.submit.ajax topic
* target - the target element form submision was loaded to
* form - the loaded form wrapper in jQuery
* originalEvent - the sys.submit.ajax topic handler event

