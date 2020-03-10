'use strict';
(function () {
  var COMMENTS_VALUE = 5;
  var usersBigPictures = document.querySelector('.big-picture');
  var bigPictureCommentsloader = usersBigPictures.querySelector('.comments-loader');
  var bigPicturesComments = usersBigPictures.querySelector('.social__comments');
  var currentCountComments = 0;
  var isDeletedDefaultComments = false;

  function onBigPicturesButtonCloseClick() {
    isDeletedDefaultComments = false;
    currentCountComments = 0;
    window.data.body.classList.remove('modal-open');
    usersBigPictures.classList.add('hidden');
    document.removeEventListener('keydown', onBigPicturesEscPress);
  }

  function onBigPicturesEscPress(evt) {
    if (evt.key === window.data.ESC_KEY) {
      isDeletedDefaultComments = false;
      currentCountComments = 0;
      window.data.body.classList.remove('modal-open');
      usersBigPictures.classList.add('hidden');
    }
  }

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

    if (!isDeletedDefaultComments) {
      removeElements(usersBigPictures.querySelectorAll('.social__comment'));
      isDeletedDefaultComments = true;
    }
    return fragmentComments;
  }

  function removeElements(elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
  }

  var createBigPicture = function (picture) {
    usersBigPictures.querySelector('.big-picture__img').firstElementChild.src = picture.url;
    usersBigPictures.querySelector('.likes-count').textContent = picture.likes;
    usersBigPictures.querySelector('.comments-count').textContent = picture.comments.length;
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
      createBigPicture(data[pictureNumber - 1]);
      usersBigPictures.classList.remove('hidden');
      window.data.body.classList.add('modal-open');
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
    window.data.usersPictures.addEventListener('click', function () {
      onUsersPicturesClick(data);
    });
  };
})();
