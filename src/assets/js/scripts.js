$(document).ready(function() {
  $('.menu').click(function() {
    $('.hidden-menu').show();
  });
  $('.close-menu').click(function() {
    $('.hidden-menu').hide();
  });
  $('.hidden-menu').children().click(function() {
    $('.hidden-menu').hide();
  });
});
