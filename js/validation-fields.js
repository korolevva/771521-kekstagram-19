'use strict';
(function () {
  var hashtagInput = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var submitButton = document.querySelector('.img-upload__submit');
  var form = document.querySelector('.img-upload__form');

  var filterItems = function (array, query) {
    return array.filter(function (el) {
      return el === query;
    });
  };

  var isRepeatingElements = function (array, currentEltment) {
    return filterItems(array, currentEltment).length === 1 ? false : true;
  };

  var isTagValid = function (tag, tags) {
    if (tag.search(window.data.REG_EXP) !== 0 || isRepeatingElements(tags, tag)) {
      return false;
    }
    return true;
  };

  var isHashtagValid = function () {
    var tags = hashtagInput.value.split(window.data.SEPARATOR);
    var isEmpty = hashtagInput.value.length === 0;
    if (tags.length > window.data.MAX_TAGS_COUNT) {
      return false;
    }

    var isValid = true;
    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i];
      if (!isTagValid(tag, tags)) {
        isValid = false;
      }
    }
    return isEmpty || isValid;
  };

  submitButton.addEventListener('click', function () {
    if (!isHashtagValid()) {
      hashtagInput.style.outline = '3px solid red';
      hashtagInput.setCustomValidity('Неверный формат ввода хэштегов');
    } else {
      hashtagInput.style.outline = '';
      hashtagInput.setCustomValidity('');
    }
  });

  var resetFieldsForm = function () {
    hashtagInput.value = '';
    textDescription.value = '';
  };

  var resetParametersForm = function (massage) {
    window.form.resetEffect();
    resetFieldsForm();
    window.openForm.uploadFileOpen.value = '';

    var button = massage.querySelector('[type=button]');
    button.removeAttribute('tabindex');
  };

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var createMessage = function (messageTemplate) {
    var messageElement = messageTemplate.cloneNode(true);
    return messageElement;
  };

  var showMassage = function (massage) {
    var main = document.querySelector('main');
    main.insertAdjacentElement('afterbegin', massage);

    var button = massage.querySelector('[type=button]');
    button.setAttribute('tabindex', '0');
    button.focus();
  };

  var onButtonClick = function (massage) {
    massage.classList.add('visually-hidden');
    resetParametersForm(massage);
  };

  var onMassageClick = function (evt, massage) {
    if (evt.target.className !== 'success__inner') {
      massage.classList.add('visually-hidden');
      resetParametersForm(massage);
    }
  };

  var onMassageEsсPress = function (evt, massage) {
    if (evt.key === window.data.ESC_KEY) {
      massage.classList.add('visually-hidden');
      resetParametersForm(massage);
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

  window.validationFields = {
    hashtagInput: hashtagInput,
    textDescription: textDescription
  };
})();
