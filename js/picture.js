'use strict';
(function () {
  var createPicture = function (picture) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.setAttribute('data-picture-number', picture.pictureNumber);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  function addPictures() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.gallery.pictures.length; i++) {
      fragment.appendChild(createPicture(window.gallery.pictures[i]));
    }
    window.data.usersPictures.appendChild(fragment);
  }

  addPictures();
})();
