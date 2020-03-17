'use strict';
(function () {
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');

  var trimPercentage = function (str) {
    return parseInt(str, 10);
  };

  var onScaleControlSmallerClick = function () {
    var scaleValue = trimPercentage(window.form.scaleControlValue.value);
    if (scaleValue > window.data.SCALE_MIN) {
      scaleValue -= window.data.STEP_SCALE;
      window.form.scaleControlValue.value = scaleValue + '%';
      window.form.previewImage.style.transform = 'scale(' + scaleValue / window.data.SCALE_MAX + ')';
    }
  };

  var onScaleControlBiggerClick = function () {
    var scaleValue = trimPercentage(window.form.scaleControlValue.value);
    if (scaleValue < window.data.SCALE_MAX) {
      scaleValue += window.data.STEP_SCALE;
      window.form.scaleControlValue.value = scaleValue + '%';
      window.form.previewImage.style.transform = 'scale(' + scaleValue / window.data.SCALE_MAX + ')';
    }
  };

  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
})();
