'use strict';

var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var NUMBER_OBJECTS = 25;
var ESC_KEY = 'Escape';
var SCALE_MAX = '100%';
var STEP_SCALE = 25;
var HASHTAG_LENGTH = 20;
var NUMBER_HASHTAGS = 5;

var usersPictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var usersBigPictures = document.querySelector('.big-picture');
// usersBigPictures.classList.remove('hidden');

var body = document.querySelector('body');
// body.classList.add('modal-open');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getComments() {
  var arrayOfComments = [];

  for (i = 0; i < getRandomInt(5, 10); i++) {
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
    arr.push({'url': 'photos/' + (i + 1) + '.jpg', 'description': 'Лучшее фото на свете!', 'likes': getRandomInt(15, 200), 'comments': getComments()});
  }

  return arr;
}

var pictures = createArrayOfObjects(NUMBER_OBJECTS);
var firstPicture = pictures[0];

var createBigPicture = function (picture) {
  usersBigPictures.querySelector('.big-picture__img').firstElementChild.src = picture.url;
  usersBigPictures.querySelector('.likes-count').textContent = picture.likes;
  usersBigPictures.querySelector('.comments-count').textContent = picture.comments.length;
  usersBigPictures.querySelector('.social__caption').textContent = picture.description;

  var bigPicturesComments = usersBigPictures.querySelector('.social__comments');
  bigPicturesComments.appendChild(createFragmentComments(firstPicture));

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
  for (i = 0; i < elements.length; i++) {
    elements[i].remove();
  }
}

var createPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(createPicture(pictures[i]));
}

usersPictures.appendChild(fragment);

createBigPicture(firstPicture);

var uploadFileOpen = document.querySelector('#upload-file');
var imageEditingForm = document.querySelector('.img-upload__overlay');
var uploadFileClose = document.querySelector('#upload-cancel');


function onImageEditingFormOpen() {
  imageEditingForm.classList.remove('hidden');
  body.classList.add('modal-open');
  scaleControlValue.value = SCALE_MAX;
  document.addEventListener('keydown', onImageEditingFormEcsPress);
}

function onImageEditingFormClose() {
  imageEditingForm.classList.add('hidden');
  uploadFileOpen.value = '';
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onImageEditingFormEcsPress);
}

function onImageEditingFormEcsPress(evt) {
  if (evt.key === ESC_KEY && evt.target.className !== 'text__hashtags') {
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

function trimPercentage(str) {
  return Number(str.slice(0, scaleControlValue.value.length - 1));
}

function onScaleControlSmallerClick() {
  if (trimPercentage(scaleControlValue.value) > 0) {
    var scaleValue = trimPercentage(scaleControlValue.value) - STEP_SCALE;
    scaleControlValue.value = scaleValue + '%';
    previewImage.style.transform = 'scale(' + 0.01 * scaleValue + ')';
  }
}

function onScaleControlBiggerClick() {
  if (trimPercentage(scaleControlValue.value) < 100) {
    var scaleValue = trimPercentage(scaleControlValue.value) + STEP_SCALE;
    scaleControlValue.value = scaleValue + '%';
    previewImage.style.transform = 'scale(' + 0.01 * scaleValue + ')';
  }
}

scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

function removeClasses(element) {
  while (element.classList.length !== 0) {
    var lastElement = element.classList.length - 1;
    previewImage.classList.remove(previewImage.classList[lastElement]);
  }
  return element;
}

function applyEffect(effectName, filterName, maxLevelIntensity) {
  removeClasses(previewImage);
  previewImage.classList.add(effectName);
  effectLevelFieldset.classList.remove('hidden');
  previewImage.style.filter = '';
  effectLevelPin.addEventListener('mouseup', function () {
    setIntensityEffect(filterName, maxLevelIntensity);
  });
}

function resetEffect() {
  removeClasses(previewImage);
  effectLevelFieldset.classList.add('hidden');
  previewImage.style.filter = '';
}

function onImageOverlayClick(evt) {
  var inputRadio = evt.target;
  if (inputRadio.id === 'effect-none') {
    resetEffect();
  } else if (inputRadio.id === 'effect-chrome') {
    applyEffect('effects__preview--chrome', 'grayscale', 1);
  } else if (inputRadio.id === 'effect-sepia') {
    applyEffect('effects__preview--sepia', 'sepia', 1);
  } else if (inputRadio.id === 'effect-marvin') {
    applyEffect('effects__preview--marvin', 'invert', '100%');
  } else if (inputRadio.id === 'effect-phobos') {
    applyEffect('effects__preview--phobos', 'blur', '3px');
  } else if (inputRadio.id === 'effect-heat') {
    applyEffect('effects__preview--heat', 'brightness', 3);
  }
}

effectsList.addEventListener('click', onImageOverlayClick);

function setIntensityEffect(effectName, maxLevelIntensity) {
  var coordsLine = effectLevelLine.getBoundingClientRect();
  var coordsPin = effectLevelPin.getBoundingClientRect();
  var positionPinOnLine = coordsPin.x - coordsLine.x - coordsPin.width;
  var widthLine = coordsLine.width;
  var intensityLevel;

  if (typeof maxLevelIntensity === 'string') {
    var maxLevelIntensityWithoutUnit;
    if (maxLevelIntensity.includes('%')) {
      maxLevelIntensityWithoutUnit = maxLevelIntensity.slice(0, maxLevelIntensity.length - 1);
      intensityLevel = (positionPinOnLine * maxLevelIntensityWithoutUnit) / widthLine;
      effectLevelValue.value = intensityLevel.toFixed();
      previewImage.style.filter = effectName + '(' + intensityLevel.toFixed() + '%' + ') ';
    } else if (maxLevelIntensity.includes('px')) {
      maxLevelIntensityWithoutUnit = maxLevelIntensity.slice(0, maxLevelIntensity.length - 2);
      intensityLevel = (positionPinOnLine * maxLevelIntensityWithoutUnit) / widthLine;
      effectLevelValue.value = intensityLevel.toFixed(2);
      previewImage.style.filter = effectName + '(' + intensityLevel.toFixed(2) + 'px' + ') ';
    }
  } else {
    intensityLevel = (positionPinOnLine * maxLevelIntensity) / widthLine;
    effectLevelValue.value = intensityLevel.toFixed(2);
    previewImage.style.filter = effectName + '(' + intensityLevel.toFixed(2) + ')';
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

function onInputPrint(evt) {
  var separator = ' ';
  var target = evt.target;
  var arrayHashtags = target.value.split(separator);
  var regexp = /^#[0-9a-zа-яё]{1,19}$/i;

  if (target.value === '') {
    hashtagInput.setCustomValidity('');
  } else {
    for (i = 0; i < arrayHashtags.length; i++) {
      if (arrayHashtags[i].length > HASHTAG_LENGTH || arrayHashtags[i].search(regexp) !== 0 || arrayHashtags.length > NUMBER_HASHTAGS || isRepeatingElements(arrayHashtags, arrayHashtags[i])) {
        hashtagInput.setCustomValidity('Неверный формат ввода хэштегов');
      } else {
        hashtagInput.setCustomValidity('');
      }
    }
  }
}


hashtagInput.addEventListener('input', onInputPrint);
