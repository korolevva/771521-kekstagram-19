'use strict';

var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var NUMBER_OBJECTS = 25;
var FIRST_BIG_PICTURE = 1;

var usersPictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var usersBigPictures = document.querySelector('.big-picture');
usersBigPictures.classList.remove('hidden');

var bigPicturesImg = usersBigPictures.querySelector('.big-picture__img').firstElementChild;
var bigPicturesLikesCount = usersBigPictures.querySelector('.likes-count');
var bigPicturesCommentsCount = usersBigPictures.querySelector('.comments-count');
var bigPicturesComments = usersBigPictures.querySelector('.social__comments');
var bigPictureAvatars = bigPicturesComments.querySelectorAll('.social__picture');
var bigPictureTextCommments = bigPicturesComments.querySelectorAll('.social__text');
var bigPictureCaption = usersBigPictures.querySelector('.social__caption');

var bigPictureCommentCounter = usersBigPictures.querySelector('.social__comment-count');
bigPictureCommentCounter.classList.add('hidden');

var bigPictureCommentsloader = usersBigPictures.querySelector('.comments-loader');
bigPictureCommentsloader.classList.add('hidden');

var body = document.querySelector('body');
body.classList.add('modal-open');

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

function fillBigPicture(picturesArray) {
  for (var i = 0; i < FIRST_BIG_PICTURE; i++) {
    bigPicturesImg.src = picturesArray[i].url;
    bigPicturesLikesCount.textContent = picturesArray[i].likes;
    bigPicturesCommentsCount.textContent = picturesArray[i].comments.length;

    for (var j = 0; j < bigPictureAvatars.length; j++) {
      bigPictureAvatars[j].src = picturesArray[j].comments[j].avatar;
      bigPictureAvatars[j].alt = picturesArray[j].comments[j].name;
    }

    for (var k = 0; k < bigPictureTextCommments.length; k++) {
      bigPictureTextCommments[k].textContent = picturesArray[k].comments[k].message;
    }

    bigPictureCaption.textContent = picturesArray[i].description;
  }
}

fillBigPicture(pictures);

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
