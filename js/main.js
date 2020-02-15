'use strict';

var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var NUMBER_OBJECTS = 25;

var usersPictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var usersBigPictures = document.querySelector('.big-picture');
usersBigPictures.classList.remove('hidden');

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
