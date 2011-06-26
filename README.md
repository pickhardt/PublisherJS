Summary
=======

Publisher was inspired by a question: what if a programming language let variables follow the [publisher-subscriber](http://en.wikipedia.org/wiki/Publish/subscribe) design pattern?

The resulting project, Publisher, lets you hook in to variables with your own subscriber functions.  This allows your functions to take action before or after the variable is read, set, or changed.  It uses JavaScript getters and setters, and therefore won't work in older browsers. For best results, use Chrome or Firefox.

It is intended as a proof-of-concept that may inspire something new.  If you decide to use it in a real project, please contact me.  I'm interested in learning how its used.

Example usage
-------------

(first include the publisher.js script)

~~~
  var beforeChange = function(before, after) { console.log("[beforeChange] Changing from " + before + " to " + after);};
  var afterChange = function(before, after) { console.log("[afterChange] Changed from " + before + " to " + after);};
  var beforeSet = function(before, after) { console.log("[beforeSet] Setting from " + before + " to " + after)};
  var afterSet = function(before, after) { console.log("[afterSet] Set from " + before + " to " + after);};
  var onGet = function(value) { console.log("[onGet] Getting value " + value);};
  
  Publisher("x")
    .beforeChange(beforeChange)
    .afterChange(afterChange)
    .beforeSet(beforeSet)
    .afterSet(afterSet)
    .onGet(onGet)
    .set("first");
  
  x;
  x = "second";
  x;
  x = "second";
  x;
  x = "third";
  x;
~~~~


Output

~~~
[beforeChange] Changing from undefined to first
[beforeSet] Setting from undefined to first
[afterChange] Changed from undefined to first
[afterSet] Set from undefined to first
[onGet] Getting value first
[beforeChange] Changing from first to second
[beforeSet] Setting from first to second
[afterChange] Changed from first to second
[afterSet] Set from first to second
[onGet] Getting value second
[beforeSet] Setting from second to second
[afterSet] Set from second to second
[onGet] Getting value second
[beforeChange] Changing from second to third
[beforeSet] Setting from second to third
[afterChange] Changed from second to third
[afterSet] Set from second to third
[onGet] Getting value third
~~~

License
-------

Released under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).
