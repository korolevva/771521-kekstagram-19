'use strict';
(function () {
  var hashtagInput = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  function onTextHashtagInput(evt) {
    var textHashtags = evt.target;
    var tags = textHashtags.value.split(window.data.SEPARATOR);
    if (tags.length > window.data.MAX_TAGS_COUNT) {
      textHashtags.setCustomValidity('Неверный формат ввода хэштегов');
    } else {
      var isFormValid = true;
      for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];
        if (!isTagValid(tag, tags)) {
          isFormValid = false;
        }
      }
      textHashtags.setCustomValidity(isFormValid ? '' : 'Неверный формат ввода хэштегов');
    }
  }

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

  function onTextDescriptionInput(evt) {
    var textLength = evt.target.value.length;
    textDescription.setCustomValidity(textLength > window.data.MAX_LENGTH_TEXT_DESCRIPTION ? 'Сообщение не должно превышать 140 символов' : '');
  }

  hashtagInput.addEventListener('input', onTextHashtagInput);
  textDescription.addEventListener('input', onTextDescriptionInput);
})();
