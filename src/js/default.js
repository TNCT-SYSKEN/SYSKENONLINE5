(function($, window, undefined) {

  'use strict';

  var obj, Obj = function() {
    this.initalized();
    return this;
  };
  Obj.prototype = {
    initalized: function() {
      this.hoge = 'hoge';
      $(document)
        .on('click', 'body', $.proxy(this.showThis, this));
    },
    showThis: function() {
      console.log(obj);
    }
  };

  $(document).ready(function() {
    new Obj();
  });

})(jQuery, window, void 0);
