###* @license Publisher
(c) Copyright 2011 Jeff Pickhardt. All Rights Reserved. 
Made by Jeff Pickhardt <{{ my last name }}@gmail.com>
Contact me if you are interested in using Publisher in a project.
###

if typeof window != "undefined"
  # In a browser
  root = window
  root.exports = root
else
  # In a server environment
  root = global # TODO - make this script work in Node.js

exports.Publisher = Publisher = class Publisher
  constructor: (name, _suppressError) ->
    if this not instanceof Publisher
      # Called without new
      this._publisherStash = {} if not this._publisherStash?
      this._publisherStash[name] = new Publisher(name, true)
      this.Object.defineProperty?(this, name, {
                                    get: () => this._publisherStash[name].get()
                                    set: (value) => this._publisherStash[name].set(value)
                                  })
      return this._publisherStash[name]
    else
      # Called with new
      if not _suppressError?
        throw "Publisher must NOT be called with the new keyword."
      @name = name
      @value = undefined
      @afterChangeSubscribers = []
      @beforeChangeSubscribers = []
      @onGetSubscribers = []
      @afterSetSubscribers = []
      @beforeSetSubscribers = []
      return this
  
  afterChange: (func) ->
    @afterChangeSubscribers.push(func)
    return this
  
  beforeChange: (func) ->
    @beforeChangeSubscribers.push(func)
    return this
  
  onGet: (func) ->
    @onGetSubscribers.push(func)
    return this
  
  afterSet: (func) ->
    @afterSetSubscribers.push(func)
    return this
  
  beforeSet: (func) ->
    @beforeSetSubscribers.push(func)
    return this

  callSubscribers: (subscribers, parameters...) ->
    if subscribers?
      for func in subscribers
        func(parameters...)
      return this
    else
      return null
  
  get: () ->
    @callSubscribers(@onGetSubscribers, @value)
    return @value
  
  set: (value) ->
    oldValue = @value
    if value == oldValue
      @callSubscribers(@beforeSetSubscribers, oldValue, value)
      @value = value
      @callSubscribers(@afterSetSubscribers, oldValue, value)
    else
      @callSubscribers(@beforeChangeSubscribers, oldValue, value)
      @callSubscribers(@beforeSetSubscribers, oldValue, value)
      @value = value
      @callSubscribers(@afterChangeSubscribers, oldValue, value)
      @callSubscribers(@afterSetSubscribers, oldValue, value)
    

exports.getPublisher = (name) -> this._publisherStash[name]
