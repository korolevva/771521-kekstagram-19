'use strict';
(function () {
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');

  function trimPercentage(str) {
    return parseInt(str, 10);
  }

  function onScaleControlSmallerClick() {
    var scaleValue = trimPercentage(window.form.scaleControlValue.value);
    if (scaleValue > window.data.SCALE_MIN) {
      scaleValue -= window.data.STEP_SCALE;
      window.form.scaleControlValue.value = scaleValue + '%';
      window.form.previewImage.style.transform = 'scale(' + scaleValue / window.data.SCALE_MAX + ')';
    }
  }

  function onScaleControlBiggerClick() {
    var scaleValue = trimPercentage(window.form.scaleControlValue.value);
    if (scaleValue < window.data.SCALE_MAX) {
      scaleValue += window.data.STEP_SCALE;
      window.form.scaleControlValue.value = scaleValue + '%';
      window.form.previewImage.style.transform = 'scale(' + scaleValue / window.data.SCALE_MAX + ')';
    }
  }

  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

})();
