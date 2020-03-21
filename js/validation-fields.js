'use strict';
(function () {
  var hashtagInput = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var submitButton = document.querySelector('.img-upload__submit');
  var form = document.querySelector('.img-upload__form');

  var filterItems = function (array, query) {
    return array.filter(function (el) {
      return el.toLowerCase() === query.toLowerCase();
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
        break;
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

  var resetParametersForm = function (message) {
    window.form.resetEffect();
    window.openForm.resetFields();

    var button = message.querySelector('[type=button]');
    button.removeAttribute('tabindex');
  };

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var createMessage = function (messageTemplate) {
    var messageElement = messageTemplate.cloneNode(true);
    return messageElement;
  };

  var showMessage = function (message) {
    var main = document.querySelector('main');
    main.insertAdjacentElement('afterbegin', message);

    var button = message.querySelector('[type=button]');
    button.setAttribute('tabindex', '0');
    button.focus();
  };

  var onButtonClick = function (message) {
    message.classList.add('visually-hidden');
    resetParametersForm(message);
  };

  var onMessageClick = function (evt, message) {
    if (evt.target.className !== 'success__inner') {
      message.classList.add('visually-hidden');
      resetParametersForm(message);
    }
  };

  var onMessageEsсPress = function (evt, message) {
    if (evt.key === window.data.ESC_KEY) {
      message.classList.add('visually-hidden');
      resetParametersForm(message);
    }
  };

  var gerenateMessage = function (messageTemplate) {
    window.openForm.imageEditingForm.classList.add('hidden');
    var message = createMessage(messageTemplate);
    showMessage(message);
    var button = message.querySelector('button');

    button.addEventListener('click', function () {
      onButtonClick(message);
      document.removeEventListener('keydown', hideMassage);
    });

    message.addEventListener('click', function (evt) {
      onMessageClick(evt, message);
      document.removeEventListener('keydown', hideMassage);
    });

    var hideMassage = function (evt) {
      onMessageEsсPress(evt, message);
      document.removeEventListener('keydown', hideMassage);
    };

    document.addEventListener('keydown', hideMassage);
  };

  var onSuccessSendForm = function () {
    gerenateMessage(successMessageTemplate);
  };

  var onErrorSendForm = function () {
    gerenateMessage(errorMessageTemplate);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(form), onSuccessSendForm, onErrorSendForm);
  });

  window.validationFields = {
    hashtagInput: hashtagInput,
    textDescription: textDescription
  };
})();
