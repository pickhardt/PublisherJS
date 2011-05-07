(function() {
  /** @license Publisher
  (c) Copyright 2011 Jeff Pickhardt. All Rights Reserved. 
  Made by Jeff Pickhardt <{{ my last name }}@gmail.com>
  Contact me if you are interested in using Publisher in a project.
  */  var Publisher, root;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  if (typeof window !== "undefined") {
    root = window;
    root.exports = root;
  } else {
    root = global;
  }
  exports.Publisher = Publisher = Publisher = (function() {
    function Publisher(name, _suppressError) {
      var _base;
      if (!(this instanceof Publisher)) {
        if (!(this._publisherStash != null)) {
          this._publisherStash = {};
        }
        this._publisherStash[name] = new Publisher(name, true);
        if (typeof (_base = this.Object).defineProperty == "function") {
          _base.defineProperty(this, name, {
            get: __bind(function() {
              return this._publisherStash[name].get();
            }, this),
            set: __bind(function(value) {
              return this._publisherStash[name].set(value);
            }, this)
          });
        }
        return this._publisherStash[name];
      } else {
        if (!(_suppressError != null)) {
          throw "Publisher must NOT be called with the new keyword.";
        }
        this.name = name;
        this.value = void 0;
        this.afterChangeSubscribers = [];
        this.beforeChangeSubscribers = [];
        this.onGetSubscribers = [];
        this.afterSetSubscribers = [];
        this.beforeSetSubscribers = [];
        return this;
      }
    }
    Publisher.prototype.afterChange = function(func) {
      this.afterChangeSubscribers.push(func);
      return this;
    };
    Publisher.prototype.beforeChange = function(func) {
      this.beforeChangeSubscribers.push(func);
      return this;
    };
    Publisher.prototype.onGet = function(func) {
      this.onGetSubscribers.push(func);
      return this;
    };
    Publisher.prototype.afterSet = function(func) {
      this.afterSetSubscribers.push(func);
      return this;
    };
    Publisher.prototype.beforeSet = function(func) {
      this.beforeSetSubscribers.push(func);
      return this;
    };
    Publisher.prototype.callSubscribers = function() {
      var func, parameters, subscribers, _i, _len;
      subscribers = arguments[0], parameters = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (subscribers != null) {
        for (_i = 0, _len = subscribers.length; _i < _len; _i++) {
          func = subscribers[_i];
          func.apply(null, parameters);
        }
        return this;
      } else {
        return null;
      }
    };
    Publisher.prototype.get = function() {
      this.callSubscribers(this.onGetSubscribers, this.value);
      return this.value;
    };
    Publisher.prototype.set = function(value) {
      var oldValue;
      oldValue = this.value;
      if (value === oldValue) {
        this.callSubscribers(this.beforeSetSubscribers, oldValue, value);
        this.value = value;
        return this.callSubscribers(this.afterSetSubscribers, oldValue, value);
      } else {
        this.callSubscribers(this.beforeChangeSubscribers, oldValue, value);
        this.callSubscribers(this.beforeSetSubscribers, oldValue, value);
        this.value = value;
        this.callSubscribers(this.afterChangeSubscribers, oldValue, value);
        return this.callSubscribers(this.afterSetSubscribers, oldValue, value);
      }
    };
    return Publisher;
  })();
  exports.getPublisher = function(name) {
    return this._publisherStash[name];
  };
}).call(this);
