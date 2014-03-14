bs.modal
========

``` html
<button
    data-topic='{ "click": "bs.modal" }'
    data-url="/some/url/that/gives/modal/html"
>show modal</button>
```

Loads modal html trough specified url by ajax, and shows it. When modal is hidden it's removed from document.

Options
-------

data-url
--------

String. Required.

data-bs-modal
-------------

Object. Alternative to ```data-url``` with url property


Exceptions
----------

**SyntaxError**
* if required ```data-url``` attribute not specified


Events
--------

**show.bs.modal**
On: the modal before show - bootstrap's event

**shown.bs.modal**
On: the modal after show - bootstrap's event

**error.bwc.bs.modal**
On: the element that triggered *bs.modal* topic
* result - ajax result object
* originalEvent - the sys.submit.ajax topic handler event


Topics
------

**bs.modal.shown**
Options:
* dom - element that triggered the *bs.modal* topic
* result - ajax result object
* modal - the loaded modal wrapped in jQuery
* originalEvent - the sys.submit.ajax topic handler event


**bs.modal.error**
Options:
* dom - element that triggered the *bs.modal* topic
* result - ajax result object
* originalEvent - the sys.submit.ajax topic handler event
