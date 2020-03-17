'use strict';
(function () {
  window.gallery = {
    pictures: createArrayOfObjects(window.data.NUMBER_OBJECTS)
  };

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getComments = function () {
    var arrayOfComments = [];

    for (var i = 0; i < getRandomInt(5, 10); i++) {
      arrayOfComments.push({
        avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
        message: generateMessage(window.data.MESSAGES),
        name: window.data.NAMES[getRandomInt(0, window.data.NAMES.length - 1)]
      });
    }

    return arrayOfComments;
  };

  var generateMessage = function (array) {
    var arrayMessages = array.slice();
    if (getRandomInt(0, 1) === 0) {
      var randomMassage = getRandomInt(0, arrayMessages.length - 1);
      return arrayMessages[randomMassage];
    } else {
      var numberFirstRandomMessage = getRandomInt(0, arrayMessages.length - 1);
      var firstRandomMessage = arrayMessages[numberFirstRandomMessage];

      arrayMessages.splice(numberFirstRandomMessage, 1);

      var numberSecondRandomMessage = getRandomInt(0, arrayMessages.length - 1);
      var secondRandomMessage = arrayMessages[numberSecondRandomMessage];
      return firstRandomMessage + ' ' + secondRandomMessage;
    }
  };

  var createArrayOfObjects = function (countObjects) {
    var arr = [];
    for (var i = 0; i < countObjects; i++) {
      arr.push({'url': 'photos/' + (i + 1) + '.jpg', 'description': 'Лучшее фото на свете!', 'likes': getRandomInt(15, 200), 'comments': getComments(), 'pictureNumber': (i + 1)});
    }
    return arr;
  };
})();
