//Sidebar на страницe Blog
var SidebarBlog = (function() {

  var init = function() {
    _setUpListners();
  };

  var sidebar = $('.sidebar__inner');


  var _setUpListners = function() {
    sidebar.on('click', _sidebarActive);
    $(window).scroll(_sidebarFixed);
    $(window).resize(_windowResize,_sidebarFixed);
    $(window).scroll(_sidebarActivePost);
  };

  var _sidebarActive = function(e) {
    e.preventDefault();
    $('.sidebar').toggleClass('sidebar__active');
  };

  var _windowResize = function() {
      var blog = $('.blog__content').offset().top;
      return blog;
    }
    // var top = sidebar.offset().top - parseFloat(sidebar.css('margin-top'));


  var _sidebarFixed = function(e) {
    var top = _windowResize();

    var y = $(this).scrollTop();

    if (y >= top) {
      sidebar.addClass('fixed');

    } else {
      sidebar.removeClass('fixed');
    };
  };


  var section = $('.article');

  var _sidebarActivePost = function(e) {
    var scroll = $(window).scrollTop();
    var sLink = $('.sidebar__link');
    section.each(function(index, elem) {
      var topEdge = $(elem).offset().top - scroll;
      var bottomEdge = topEdge + $(elem).height();
      if (topEdge < 10 && bottomEdge > 10) {
        sLink.removeClass('active');
        $('#link-' + index).addClass('active');
      }
    });
  }

  return {
    init: init
  }
})();

SidebarBlog.init();
