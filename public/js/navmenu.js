//Меню навигации
var NavMenu = (function(){

  var init = function (){
    _setUpListners();
  }
  //Прослушка событий
  var _setUpListners = function(){
    $('#nav-icon').on('click', _showMenu);
  }

  var _showMenu = function(e){
    e.preventDefault();
    $('body').toggleClass('overflow');
    $(this).toggleClass('open');
    $('#overlay').toggleClass('open');
  }


  return {
    init: init
  }
})();

NavMenu.init();