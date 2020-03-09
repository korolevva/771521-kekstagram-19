'use strict';
(function () {
  var uploadFileOpen = document.querySelector('#upload-file');
  var uploadFileClose = document.querySelector('#upload-cancel');
  var imageEditingForm = document.querySelector('.img-upload__overlay');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var previewImage = document.querySelector('.img-upload__preview img');
  var effectsList = document.querySelector('.effects__list');
  var effectLevelFieldset = document.querySelector('.img-upload__effect-level');
  effectLevelFieldset.classList.add('hidden');

  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var hashtagInput = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var currentEffect;

  function onImageEditingFormOpen() {
    imageEditingForm.classList.remove('hidden');
    window.data.body.classList.add('modal-open');
    scaleControlValue.value = window.data.SCALE_MAX + '%';
    document.addEventListener('keydown', onImageEditingFormEsсPress);
  }

  function onImageEditingFormClose() {
    imageEditingForm.classList.add('hidden');
    uploadFileOpen.value = '';
    window.data.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onImageEditingFormEsсPress);
  }

  function onImageEditingFormEsсPress(evt) {
    if (evt.key === window.data.ESC_KEY && evt.target.className !== 'text__hashtags' && evt.target.className !== 'text__description') {
      imageEditingForm.classList.add('hidden');
      uploadFileOpen.value = '';
    }
  }

  uploadFileOpen.addEventListener('change', onImageEditingFormOpen);
  uploadFileClose.addEventListener('click', onImageEditingFormClose);

  function trimPercentage(str) {
    return parseInt(str, 10);
  }

  function onScaleControlSmallerClick() {
    var scaleValue = trimPercentage(scaleControlValue.value);
    if (scaleValue > window.data.SCALE_MIN) {
      scaleValue -= window.data.STEP_SCALE;
      scaleControlValue.value = scaleValue + '%';
      previewImage.style.transform = 'scale(' + scaleValue / window.data.SCALE_MAX + ')';
    }
  }

  function onScaleControlBiggerClick() {
    var scaleValue = trimPercentage(scaleControlValue.value);
    if (scaleValue < window.data.SCALE_MAX) {
      scaleValue += window.data.STEP_SCALE;
      scaleControlValue.value = scaleValue + '%';
      previewImage.style.transform = 'scale(' + scaleValue / window.data.SCALE_MAX + ')';
    }
  }

  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

  function getIntensityValue() {
    var coordsLine = effectLevelLine.getBoundingClientRect();
    var coordsPin = effectLevelPin.getBoundingClientRect();
    var positionPinOnLine = coordsPin.x - coordsLine.x - coordsPin.width;
    var widthLine = coordsLine.width;
    var intensityLevel;

    intensityLevel = (positionPinOnLine * window.data.MAX_LEVEL_INTENSITY_EFFECT) / widthLine;
    return intensityLevel.toFixed(2);
  }

  function applyEffect(effectName, levelIntensity) {
    addEffect(effectName);
    effectLevelPin.addEventListener('mouseup', function () {
      setIntensityEffect1(effectName, levelIntensity);
    });
  }

  function setIntensityEffect1(effectName, levelIntensity) {
    var objectEffect;
    for (var i = 0; i < window.data.COLOR_EFFECTS.length; i++) {
      if (effectName === window.data.COLOR_EFFECTS[i].className) {
        objectEffect = window.data.COLOR_EFFECTS[i];
      }
    }
    levelIntensity = objectEffect.maxLevelIntensity * levelIntensity / window.data.MAX_LEVEL_INTENSITY_EFFECT;
    levelIntensity = levelIntensity.toFixed(2);
    effectLevelValue.value = levelIntensity + '';
    if (objectEffect.hasOwnProperty('unitMeasurement')) {
      previewImage.style.filter = objectEffect.filterName + '(' + levelIntensity + objectEffect.unitMeasurement + ') ';
    } else {
      previewImage.style.filter = objectEffect.filterName + '(' + levelIntensity + ') ';
    }
  }

  function addEffect(effectName) {
    previewImage.classList.remove(currentEffect);
    currentEffect = effectName;
    previewImage.classList.add(currentEffect);
    previewImage.style.filter = '';
  }

  effectLevelPin.addEventListener('mouseup', function () {
  });

  function resetEffect() {
    previewImage.classList.remove(currentEffect);
    effectLevelFieldset.classList.add('hidden');
    previewImage.style.filter = '';
  }

  function onChangeFilter(evt) {
    var inputRadio = evt.target;
    switch (inputRadio.id) {
      case 'effect-none':
        resetEffect();
        break;
      case 'effect-chrome':
        effectLevelFieldset.classList.remove('hidden');
        applyEffect('effects__preview--chrome', getIntensityValue());
        break;
      case 'effect-sepia':
        effectLevelFieldset.classList.remove('hidden');
        applyEffect('effects__preview--sepia', getIntensityValue());
        break;
      case 'effect-marvin':
        effectLevelFieldset.classList.remove('hidden');
        applyEffect('effects__preview--marvin', getIntensityValue());
        break;
      case 'effect-phobos':
        effectLevelFieldset.classList.remove('hidden');
        applyEffect('effects__preview--phobos', getIntensityValue());
        break;
      case 'effect-heat':
        effectLevelFieldset.classList.remove('hidden');
        applyEffect('effects__preview--heat', getIntensityValue());
        break;
    }
  }

  effectsList.addEventListener('change', onChangeFilter);

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
