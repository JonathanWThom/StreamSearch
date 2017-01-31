$(document).ready(function() {
  $('.menu').click(function() {
    $('.hidden-menu').show();
  });
  $('.close-menu').click(function() {
    $('.hidden-menu').hide();
  });
  $('.hidden-menu li').click(function() {
    $('.hidden-menu').hide();
  });
});
