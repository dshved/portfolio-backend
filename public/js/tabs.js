//Табы в админке
var Tabs = (function() {

  var init = function() {
    _setUpListners();
  }

  var _setUpListners = function() {
    $('.tabs__control-link').on('click', _tabActive);
  }


  var _tabActive = function(e) {
    e.preventDefault();
    var item = $(this).closest('.tabs__controls-item'),
      contentItem = $('.tabs__item'),
      itemPosition = item.index();
      
    contentItem.eq(itemPosition)
      .add(item)
      .addClass('active')
      .siblings()
      .removeClass('active');
  };



  return {
    init: init
  }

})();

Tabs.init();