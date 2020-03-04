'use strict';

var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var NUMBER_OBJECTS = 25;
var ESC_KEY = 'Escape';
var SCALE_MAX = '100%';
var STEP_SCALE = 25;
var MAX_TAGS_COUNT = 5;
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
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var usersBigPictures = document.querySelector('.big-picture');

var body = document.querySelector('body');
// body.classList.add('modal-open');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getComments() {
  var arrayOfComments = [];

  for (var i = 0; i < getRandomInt(5, 10); i++) {
    arrayOfComments.push({
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: generateMessage(MESSAGES),
      name: NAMES[getRandomInt(0, NAMES.length - 1)]
    });
  }

  return arrayOfComments;
}

function generateMessage(array) {
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
}

function createArrayOfObjects(countObjects) {
  var arr = [];
  for (var i = 0; i < countObjects; i++) {
    arr.push({'url': 'photos/' + (i + 1) + '.jpg', 'description': 'Лучшее фото на свете!', 'likes': getRandomInt(15, 200), 'comments': getComments(), 'pictureNumber': (i + 1)});
  }
  return arr;
}

var pictures = createArrayOfObjects(NUMBER_OBJECTS);

function addPictures() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(createPicture(pictures[i]));
  }
  usersPictures.appendChild(fragment);
}

function onBigPicturesButtonCloseClick() {
  usersBigPictures.classList.add('hidden');
  document.removeEventListener('keydown', onBigPicturesEscPress);
}

function onBigPicturesEscPress(evt) {
  if (evt.key === ESC_KEY) {
    usersBigPictures.classList.add('hidden');
  }
}

var createBigPicture = function (picture) {
  usersBigPictures.querySelector('.big-picture__img').firstElementChild.src = picture.url;
  usersBigPictures.querySelector('.likes-count').textContent = picture.likes;
  usersBigPictures.querySelector('.comments-count').textContent = picture.comments.length;
  usersBigPictures.querySelector('.social__caption').textContent = picture.description;
  var bigPictureCancel = usersBigPictures.querySelector('.big-picture__cancel');
  bigPictureCancel.addEventListener('click', onBigPicturesButtonCloseClick);

  var bigPicturesComments = usersBigPictures.querySelector('.social__comments');
  bigPicturesComments.appendChild(createFragmentComments(picture));

  var bigPictureCommentCounter = usersBigPictures.querySelector('.social__comment-count');
  bigPictureCommentCounter.classList.add('hidden');

  var bigPictureCommentsloader = usersBigPictures.querySelector('.comments-loader');
  bigPictureCommentsloader.classList.add('hidden');

  return usersBigPictures;
};

function generateCommentsBigPicture(comment) {
  var bigPicturesComment = usersBigPictures.querySelector('.social__comment').cloneNode(true);
  var bigPictureAvatars = bigPicturesComment.querySelector('.social__picture');
  var bigPictureTextCommments = bigPicturesComment.querySelector('.social__text');

  bigPictureAvatars.src = comment.avatar;
  bigPictureAvatars.alt = comment.name;
  bigPictureTextCommments.textContent = comment.message;

  return bigPicturesComment;
}

function createFragmentComments(picture) {
  var fragmentComments = document.createDocumentFragment();

  for (var i = 0; i < picture.comments.length; i++) {
    fragmentComments.append(generateCommentsBigPicture(picture.comments[i]));
  }
  removeElements(usersBigPictures.querySelectorAll('.social__comment'));
  return fragmentComments;
}

function removeElements(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].remove();
  }
}

var createPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.setAttribute('data-picture-number', picture.pictureNumber);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

addPictures();

function onUsersPicturesClick() {
  var pictureNumber = document.activeElement.dataset.pictureNumber;
  if (document.activeElement.className === 'picture') {
    createBigPicture(pictures[pictureNumber - 1]);
    usersBigPictures.classList.remove('hidden');
  }
  document.addEventListener('keydown', onBigPicturesEscPress);
}

usersPictures.addEventListener('click', onUsersPicturesClick);

var uploadFileOpen = document.querySelector('#upload-file');
var imageEditingForm = document.querySelector('.img-upload__overlay');
var uploadFileClose = document.querySelector('#upload-cancel');


function onImageEditingFormOpen() {
  imageEditingForm.classList.remove('hidden');
  body.classList.add('modal-open');
  scaleControlValue.value = SCALE_MAX;
  document.addEventListener('keydown', onImageEditingFormEsсPress);
}

function onImageEditingFormClose() {
  imageEditingForm.classList.add('hidden');
  uploadFileOpen.value = '';
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onImageEditingFormEsсPress);
}

function onImageEditingFormEsсPress(evt) {
  if (evt.key === ESC_KEY && evt.target.className !== 'text__hashtags' && evt.target.className !== 'text__description') {
    imageEditingForm.classList.add('hidden');
    uploadFileOpen.value = '';
  }
}

uploadFileOpen.addEventListener('change', onImageEditingFormOpen);
uploadFileClose.addEventListener('click', onImageEditingFormClose);


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

function trimPercentage(str) {
  return parseInt(str, 10);
}

function onScaleControlSmallerClick() {
  var scaleValue = trimPercentage(scaleControlValue.value);
  if (scaleValue > 0) {
    scaleValue -= STEP_SCALE;
    scaleControlValue.value = scaleValue + '%';
    previewImage.style.transform = 'scale(' + scaleValue / 100 + ')';
  }
}

function onScaleControlBiggerClick() {
  var scaleValue = trimPercentage(scaleControlValue.value);
  if (scaleValue < 100) {
    scaleValue += STEP_SCALE;
    scaleControlValue.value = scaleValue + '%';
    previewImage.style.transform = 'scale(' + scaleValue / 100 + ')';
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

  intensityLevel = (positionPinOnLine * MAX_LEVEL_INTENSITY_EFFECT) / widthLine;
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
  for (var i = 0; i < COLOR_EFFECTS.length; i++) {
    if (effectName === COLOR_EFFECTS[i].className) {
      objectEffect = COLOR_EFFECTS[i];
    }
  }
  levelIntensity = objectEffect.maxLevelIntensity * levelIntensity / MAX_LEVEL_INTENSITY_EFFECT;
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
  var tags = textHashtags.value.split(SEPARATOR);
  if (tags.length > MAX_TAGS_COUNT) {
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
  if (tag.search(REG_EXP) !== 0 || isRepeatingElements(tags, tag)) {
    return false;
  } else {
    return true;
  }
}

function onTextDescriptionInput(evt) {
  var textLength = evt.target.value.length;
  textDescription.setCustomValidity(textLength > 140 ? 'Сообщение не должно превышать 140 символов' : '');
}

hashtagInput.addEventListener('input', onTextHashtagInput);
textDescription.addEventListener('input', onTextDescriptionInput);
