'use strict';
(function () {
  var scaleControlValue = document.querySelector('.scale__control--value');
  var previewImage = document.querySelector('.img-upload__preview img');
  var effectsList = document.querySelector('.effects__list');
  var effectLevelFieldset = document.querySelector('.img-upload__effect-level');
  effectLevelFieldset.classList.add('hidden');

  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var currentEffect;

  var getIntensityValue = function () {
    var coordsLine = effectLevelLine.getBoundingClientRect();
    var coordsPin = effectLevelPin.getBoundingClientRect();
    var positionPinOnLine = coordsPin.x - coordsLine.x + (coordsPin.width / 2);
    var widthLine = coordsLine.width;
    var levelIntensity = (positionPinOnLine * window.data.MAX_LEVEL_INTENSITY_EFFECT) / widthLine;
    return levelIntensity.toFixed(2);
  };

  var addEffect = function (effectName) {
    previewImage.classList.remove(currentEffect);
    currentEffect = effectName;
    previewImage.classList.add(currentEffect);
    previewImage.style.filter = '';
  };

  var resetPositionPin = function () {
    effectLevelPin.style.left = effectLevelLine.getBoundingClientRect().width + 'px';
    effectLevelDepth.style.width = effectLevelLine.getBoundingClientRect().width + 'px';
  };

  var applyEffect = function (effectName, levelIntensity) {
    addEffect(effectName);
    levelIntensity = window.data.MAX_LEVEL_INTENSITY_EFFECT;
    resetPositionPin();
    setIntensityEffect(effectName, levelIntensity);
  };

  var setIntensityEffect = function (effectName, levelIntensity) {
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
  };

  var resetEffect = function () {
    if (previewImage.className !== '') {
      previewImage.classList.remove(previewImage.className);
      previewImage.style.filter = '';
    }
    effectLevelFieldset.classList.add('hidden');
  };

  var onChangeFilter = function (evt) {
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
      default:
        throw new Error('Неизвестный фильтр: «' + inputRadio.id + '»');
    }
  };

  effectsList.addEventListener('change', onChangeFilter);

  var onPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords.x = moveEvt.clientX;

      var coordsLine = effectLevelLine.getBoundingClientRect();
      var positionLevelPin = effectLevelPin.offsetLeft - shift.x;

      if (positionLevelPin >= 0 && positionLevelPin <= coordsLine.width) {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
        effectLevelDepth.style.width = effectLevelPin.style.left;
      }
      setIntensityEffect(currentEffect, getIntensityValue());
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  effectLevelPin.addEventListener('mousedown', onPinMouseDown);

  window.form = {
    scaleControlValue: scaleControlValue,
    previewImage: previewImage,
    currentEffect: currentEffect,
    resetEffect: resetEffect
  };
})();
