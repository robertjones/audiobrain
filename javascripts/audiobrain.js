(function() {
  var animate, audio, enablePlay, generateSentence, generateWords, randNum, randOperator, setDelay, speak, th, togglePlay, _i, _playing, _sentence, _words;

  _i = 0;

  _words = [];

  _sentence = [];

  _playing = false;

  animate = function() {
    var delay, phrase, word;
    if (_playing === false) {
      return;
    }
    if (_.isEmpty(_sentence)) {
      _sentence = generateSentence();
    }
    if (_.isEmpty(_words)) {
      phrase = _sentence.shift();
    }
    if (_.isEmpty(_words)) {
      _words = generateWords(phrase);
    }
    word = _words.shift();
    speak(word);
    delay = setDelay(word);
    if (_.isEmpty(_words)) {
      delay += 1200;
    }
    return setTimeout(animate, delay);
  };

  generateSentence = function() {
    var first, operator, result, second;
    first = randNum(50);
    second = randNum(50);
    operator = randOperator();
    result = operator[1](first, second);
    return [first, operator[0], second, 'is', result];
  };

  randNum = function(max) {
    return Math.ceil(Math.random() * max);
  };

  randOperator = function() {
    var operators;
    operators = [
      [
        'plus', function(a, b) {
          return a + b;
        }
      ], [
        'minus', function(a, b) {
          return a - b;
        }
      ]
    ];
    return operators[Math.round(Math.random())];
  };

  generateWords = function(content) {
    var phrase;
    if (_.isNumber(content)) {
      if (content === 0) {
        phrase = "zero ";
      }
      if (content > 0) {
        phrase = toWords(content);
      }
      if (content < 0) {
        phrase = "minus " + toWords(content * (-1));
      }
    } else {
      phrase = content + " ";
    }
    return _.initial(phrase.split(" "));
  };

  setDelay = function(word) {
    return 600;
  };

  audio = function(word) {
    return $('#audio-' + word)[0];
  };

  speak = function(word) {
    $('#maths').text("" + word + " ");
    return audio(word).play();
  };

  enablePlay = function() {
    $('#playpause').removeAttr('disabled');
    return $('#playpause').click(function() {
      return togglePlay();
    });
  };

  togglePlay = function() {
    if (_playing) {
      _playing = false;
      return $('#playpause').text("Play");
    } else {
      _playing = true;
      $('#playpause').text("Pause");
      return animate();
    }
  };

  th = ['', 'thousand', 'million', 'billion', 'trillion'];

  var dg = ['zero','one','two','three','four', 'five','six','seven','eight','nine']; var tn = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen', 'seventeen','eighteen','nineteen']; var tw = ['twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety']; function toWords(s){s = s.toString(); s = s.replace(/[\, ]/g,''); if (s != parseFloat(s)) return 'not a number'; var x = s.indexOf('.'); if (x == -1) x = s.length; if (x > 15) return 'too big'; var n = s.split(''); var str = ''; var sk = 0; for (var i=0; i < x; i++) {if ((x-i)%3==2) {if (n[i] == '1') {str += tn[Number(n[i+1])] + ' '; i++; sk=1;} else if (n[i]!=0) {str += tw[n[i]-2] + ' ';sk=1;}} else if (n[i]!=0) {str += dg[n[i]] +' '; if ((x-i)%3==0) str += 'hundred ';sk=1;} if ((x-i)%3==1) {if (sk) str += th[(x-i-1)/3] + ' ';sk=0;}} if (x != s.length) {var y = s.length; str += 'point '; for (var i=x+1; i<y; i++) str += dg[n[i]] +' ';} return str.replace(/\s+/g,' ');};


  $(document).ready(function() {
    return enablePlay();
  });

}).call(this);
