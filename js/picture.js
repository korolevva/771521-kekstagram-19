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

  window.addPictures = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      data[i]['pictureNumber'] = i + 1;
      fragment.appendChild(createPicture(data[i]));
    }
    window.data.usersPictures.appendChild(fragment);
  };

  var onLoad = function (data) {
    window.addPictures(data);
    window.clickBigPicture(data);
  };

  window.backend.load(onLoad);
})();
