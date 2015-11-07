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
        .on('click', 'body', $.proxy(this.Func, this));
    },
    Func: function() {
      console.log(this);
    }
  };

  $(document).ready(function() {
    obj = new Obj();
  });

})(jQuery, window, void 0);
