'use strict';
(function () {
  var NUMBER_OBJECTS = 25;
  var ESC_KEY = 'Escape';
  var SCALE_MIN = 0;
  var SCALE_MAX = 100;
  var SCALE_DEFAULT = 1;
  var STEP_SCALE = 25;
  var MAX_TAGS_COUNT = 5;
  var MAX_LENGTH_TEXT_DESCRIPTION = 140;
  var MAX_LEVEL_INTENSITY_EFFECT = 1;
  var REG_EXP = /^#[0-9a-zа-яё]{1,19}$/i;
  var SEPARATOR = ' ';
  var COLOR_EFFECTS = [
    {
      id: 'effect-none',
      className: 'effects__preview--none'
    },
    {
      id: 'effect-chrome',
      className: 'effects__preview--chrome',
      filterName: 'grayscale',
      maxLevelIntensity: 1
    },
    {
      id: 'effect-sepia',
      className: 'effects__preview--sepia',
      filterName: 'sepia',
      maxLevelIntensity: 1
    },
    {
      id: 'effect-marvin',
      className: 'effects__preview--marvin',
      filterName: 'invert',
      maxLevelIntensity: 100,
      unitMeasurement: '%'
    },
    {
      id: 'effect-phobos',
      className: 'effects__preview--phobos',
      filterName: 'blur',
      maxLevelIntensity: 3,
      unitMeasurement: 'px'
    },
    {
      id: 'effect-heat',
      className: 'effects__preview--heat',
      filterName: 'brightness',
      maxLevelIntensity: 3,
    }
  ];

  var usersPictures = document.querySelector('.pictures');

  window.data = {
    NUMBER_OBJECTS: NUMBER_OBJECTS,
    ESC_KEY: ESC_KEY,
    SCALE_MIN: SCALE_MIN,
    SCALE_MAX: SCALE_MAX,
    SCALE_DEFAULT: SCALE_DEFAULT,
    STEP_SCALE: STEP_SCALE,
    MAX_TAGS_COUNT: MAX_TAGS_COUNT,
    MAX_LEVEL_INTENSITY_EFFECT: MAX_LEVEL_INTENSITY_EFFECT,
    MAX_LENGTH_TEXT_DESCRIPTION: MAX_LENGTH_TEXT_DESCRIPTION,
    REG_EXP: REG_EXP,
    SEPARATOR: SEPARATOR,
    COLOR_EFFECTS: COLOR_EFFECTS,
    usersPictures: usersPictures,
  };
})();
