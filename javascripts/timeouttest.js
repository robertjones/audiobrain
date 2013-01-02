(function() {
  var changeText, i;

  i = 0;

  changeText = function() {
    $('#maths').text("" + i);
    i++;
    return setTimeout(changeText, 1500);
  };

  $(document).ready(function() {
    return changeText();
  });

}).call(this);
