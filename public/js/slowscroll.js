//Медленный скрол
var SlowScroll = (function() {

  var init = function() {
    _serUpListners();
  };

  var _serUpListners = function() {
    $('a[href*="#"]:not([href="#"])').on('click', _slowScroll);
  };

  var _slowScroll = function(e) {
    e.preventDefault();
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  };

  return {
    init: init
  }
})();


SlowScroll.init();