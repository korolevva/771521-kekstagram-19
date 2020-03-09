'use strict';
(function () {
  var usersBigPictures = document.querySelector('.big-picture');

  function onBigPicturesButtonCloseClick() {
    usersBigPictures.classList.add('hidden');
    document.removeEventListener('keydown', onBigPicturesEscPress);
  }

  function onBigPicturesEscPress(evt) {
    if (evt.key === window.data.ESC_KEY) {
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

  function onUsersPicturesClick() {
    var pictureNumber = document.activeElement.dataset.pictureNumber;
    if (document.activeElement.className === 'picture') {
      createBigPicture(window.gallery.pictures[pictureNumber - 1]);
      usersBigPictures.classList.remove('hidden');
    }
    document.addEventListener('keydown', onBigPicturesEscPress);
  }

  window.data.usersPictures.addEventListener('click', onUsersPicturesClick);
})();
