var _ = require("underscore"),
    soupselect = require("cheerio-soupselect"),
    $ = require("../cheerio");

var find = exports.find = function(selector) {
  if(!selector) return this;

  var elem = soupselect.select(this.toArray(), selector);
  return $(elem);
};

var parent = exports.parent = function(elem) {
  if(this[0] && this[0].parent)
    return $(this[0].parent);
  else
    return null;
};

var next = exports.next = function(elem) {
  if(!this[0]) return null;

  var nextSibling = this[0].next;
  while(nextSibling) {
    if($.isTag(nextSibling)) return $(nextSibling);
    nextSibling = nextSibling.next;
  }
};

var prev = exports.prev = function(elem) {
  if(!this[0]) return null;

  var prevSibling = this[0].prev;
  while(prevSibling) {
    if($.isTag(prevSibling)) return $(prevSibling);
    prevSibling = prevSibling.prev;
  }
};

var siblings = exports.siblings = function(elem) {
  if(!this[0]) return null;

  var self = this,
      siblings = (this.parent()) ? this.parent().children()
                                 : this.siblingsAndMe();

  siblings = _.filter(siblings, function(elem) {
    return (elem !== self[0] && $.isTag(elem));
  });

  return $(siblings);
};

var children = exports.children = function(selector) {
  if(!this[0] || !this[0].children) return null;

  var children = _.filter(this[0].children, function(elem) {
    return $.isTag(elem);
  });

  if(!selector) return $(children);

  // remove depth
  for(var i = 0; i < children.length; i++)
    delete children.children;

  return $(children).find(selector);
};

var each = exports.each = function(callback, args) {
  return $.each(this, callback, args);
};

module.exports = $.fn.extend(exports);