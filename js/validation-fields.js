'use strict';
(function () {
  var hashtagInput = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var submitButton = document.querySelector('.img-upload__submit');
  var form = document.querySelector('.img-upload__form');

  function filterItems(array, query) {
    return array.filter(function (el) {
      return el === query;
    });
  }

  function isRepeatingElements(array, currentEltment) {
    return filterItems(array, currentEltment).length === 1 ? false : true;
  }

  function isTagValid(tag, tags) {
    if (tag.search(window.data.REG_EXP) !== 0 || isRepeatingElements(tags, tag)) {
      return false;
    } else {
      return true;
    }
  }

  function isHashtagValid() {
    var tags = hashtagInput.value.split(window.data.SEPARATOR);
    var isEmpty = hashtagInput.value.length === 0;
    if (tags.length > window.data.MAX_TAGS_COUNT) {
      return false;
    } else {
      var isValid = true;
      for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];
        if (!isTagValid(tag, tags)) {
          isValid = false;
        }
      }
      return isEmpty || isValid;
    }
  }

  submitButton.addEventListener('click', function () {
    if (!isHashtagValid()) {
      hashtagInput.style.outline = '3px solid red';
      hashtagInput.setCustomValidity('Неверный формат ввода хэштегов');
    } else {
      hashtagInput.style.outline = '';
      hashtagInput.setCustomValidity('');
    }
  });

  function resetFieldsForm() {
    hashtagInput.value = '';
    textDescription.value = '';
  }

  function resetParametersForm() {
    window.form.resetEffect();
    resetFieldsForm();
    window.openForm.uploadFileOpen.value = '';
  }

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var createMessage = function (messageTemplate) {
    var messageElement = messageTemplate.cloneNode(true);
    return messageElement;
  };

  var showMassage = function (massage) {
    var main = document.querySelector('main');
    main.insertAdjacentElement('afterbegin', massage);
  };

  var onButtonClick = function (massage) {
    massage.classList.add('visually-hidden');
    resetParametersForm();
  };

  var onMassageClick = function (evt, massage) {
    if (evt.target.className !== 'success__inner') {
      massage.classList.add('visually-hidden');
      resetParametersForm();
    }
  };

  var onMassageEsсPress = function (evt, massage) {
    if (evt.key === window.data.ESC_KEY) {
      massage.classList.add('visually-hidden');
      resetParametersForm();
    }
  };

  var onSuccessSendForm = function () {
    window.openForm.imageEditingForm.classList.add('hidden');
    var message = createMessage(successMessageTemplate);
    showMassage(message);
    var button = document.querySelector('.success__button');

    button.addEventListener('click', function () {
      onButtonClick(message);
    });

    message.addEventListener('click', function (evt) {
      onMassageClick(evt, message);
    });

    document.addEventListener('keydown', function (evt) {
      onMassageEsсPress(evt, message);

      document.removeEventListener('keydown', function () {
        onMassageEsсPress(evt, message);
      });
    });

  };

  var onError = function () {
    window.openForm.imageEditingForm.classList.add('hidden');
    var message = createMessage(errorMessageTemplate);
    showMassage(message);
    var button = document.querySelector('.error__button');

    button.addEventListener('click', function () {
      onButtonClick(message);
    });

    message.addEventListener('click', function (evt) {
      onMassageClick(evt, message);
    });

    document.addEventListener('keydown', function (evt) {
      onMassageEsсPress(evt, message);

      document.removeEventListener('keydown', function () {
        onMassageEsсPress(evt, message);
      });
    });

  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(form), onSuccessSendForm, onError);
  });
})();
