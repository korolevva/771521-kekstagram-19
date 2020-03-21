'use strict';
(function () {
  var COMMENTS_VALUE = 5;
  var body = document.querySelector('body');
  var usersBigPictures = document.querySelector('.big-picture');
  var bigPictureCommentsloader = usersBigPictures.querySelector('.comments-loader');
  var bigPicturesComments = usersBigPictures.querySelector('.social__comments');
  var currentCountComments = 0;
  var defaultComment = usersBigPictures.querySelector('.social__comment').cloneNode(true);

  var resetComments = function () {
    removeElements(usersBigPictures.querySelectorAll('.social__comment'));
    bigPicturesComments.appendChild(defaultComment);
    currentCountComments = 0;
    body.classList.remove('modal-open');
    usersBigPictures.classList.add('hidden');
    usersBigPictures.removeAttribute('tabindex');
  };

  var onBigPicturesButtonCloseClick = function () {
    resetComments();
    document.removeEventListener('keydown', onBigPicturesEscPress);
  };

  var onBigPicturesEscPress = function (evt) {
    if (evt.key === window.data.ESC_KEY) {
      resetComments();
    }
  };

  var generateCommentsBigPicture = function (comment) {
    var bigPicturesComment = defaultComment.cloneNode(true);
    var bigPictureAvatars = bigPicturesComment.querySelector('.social__picture');
    var bigPictureTextCommments = bigPicturesComment.querySelector('.social__text');

    bigPictureAvatars.src = comment.avatar;
    bigPictureAvatars.alt = comment.name;
    bigPictureTextCommments.textContent = comment.message;

    return bigPicturesComment;
  };

  var createFragmentComments = function (picture) {
    var fragmentComments = document.createDocumentFragment();
    var takeNumber;

    if ((picture.comments.length - currentCountComments) > COMMENTS_VALUE) {
      takeNumber = COMMENTS_VALUE;
      bigPictureCommentsloader.classList.remove('hidden');
    } else {
      takeNumber = picture.comments.length - currentCountComments;
    }

    for (var i = 0; i < takeNumber; i++) {
      fragmentComments.append(generateCommentsBigPicture(picture.comments[currentCountComments]));
      currentCountComments++;
    }

    return fragmentComments;
  };

  var removeElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
  };

  var createBigPicture = function (picture) {
    usersBigPictures.querySelector('.big-picture__img').firstElementChild.src = picture.url;
    usersBigPictures.querySelector('.likes-count').textContent = picture.likes;
    usersBigPictures.querySelector('.social__caption').textContent = picture.description;
    var bigPictureCancel = usersBigPictures.querySelector('.big-picture__cancel');
    bigPictureCancel.addEventListener('click', onBigPicturesButtonCloseClick);
    bigPicturesComments.appendChild(createFragmentComments(picture));
    var bigPictureCommentCounter = usersBigPictures.querySelector('.social__comment-count');
    bigPictureCommentCounter.classList.add('hidden');

    return usersBigPictures;
  };

  var onUsersPicturesClick = function (data) {
    var pictureNumber = document.activeElement.dataset.pictureNumber;
    if (document.activeElement.className === 'picture') {
      removeElements(usersBigPictures.querySelectorAll('.social__comment'));
      createBigPicture(data[pictureNumber - 1]);
      usersBigPictures.classList.remove('hidden');
      body.classList.add('modal-open');
      usersBigPictures.setAttribute('tabindex', '0');
      usersBigPictures.focus();
    }
    document.addEventListener('keydown', onBigPicturesEscPress);

    var onCommentsloaderClick = function () {
      bigPicturesComments.appendChild(createFragmentComments(data[pictureNumber - 1]));
      if (currentCountComments === data[pictureNumber - 1].comments.length) {
        bigPictureCommentsloader.removeEventListener('click', onCommentsloaderClick);
        bigPictureCommentsloader.classList.add('hidden');
      }
    };

    bigPictureCommentsloader.addEventListener('click', onCommentsloaderClick);
  };

  window.clickBigPicture = function (data) {
    window.data.usersPictures.addEventListener('click', function (evt) {
      if (evt.target.className === 'picture__img') {
        onUsersPicturesClick(data);
      }
    });
  };
})();
