'use strict';
(function () {
  var pictures = [];
  var originalPictures = [];
  var randomPictures = [];
  var discussedPictures = [];
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
    var imgFilters = document.querySelector('.img-filters');
    document.querySelector('.pictures');
    for (var i = 0; i < data.length; i++) {
      data[i]['pictureNumber'] = i + 1;
      fragment.appendChild(createPicture(data[i]));
    }
    window.data.usersPictures.appendChild(fragment);
    imgFilters.classList.remove('img-filters--inactive');
  };

  var onLoad = function (data) {
    pictures = data;
    originalPictures = data.slice();
    updatePictures();
    window.clickBigPicture(pictures);
  };

  window.backend.load(onLoad);

  var updatePictures = function () {

    window.addPictures(pictures);
  };

  var getRandomElement = function (array) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  var filterDefault = document.querySelector('#filter-default');
  var activeFilter = filterDefault;
  var imgFilters = document.querySelector('.img-filters__form');

  function delBlocks() {
    var usersPictures = document.querySelector('.pictures');
    var blocks = usersPictures.children;
    for (var i = blocks.length - 1; i >= 0; i--) {
      if (blocks[i].className !== 'picture') {
        break;
      }
      usersPictures.removeChild(blocks[i]);
    }
  }

  imgFilters.addEventListener('click', function (evt) {
    var filter = evt.target;
    if (filter !== activeFilter) {
      activeFilter.classList.remove('img-filters__button--active');
      filter.classList.add('img-filters__button--active');
      activeFilter = filter;

      switch (filter.id) {
        case 'filter-default':
          delBlocks();
          pictures = originalPictures;
          break;
        case 'filter-random':
          delBlocks();
          randomPictures = [];
          while (randomPictures.length < 10) {
            var randomElement = getRandomElement(pictures);
            var repeatingElement = randomPictures.find(function (item) {
              return item === randomElement;
            });
            if (repeatingElement === undefined) {
              randomPictures.push(randomElement);
            }
          }
          pictures = randomPictures;
          break;
        case 'filter-discussed':
          delBlocks();
          discussedPictures = [];
          discussedPictures = originalPictures.slice().sort(function (a, b) {
            var diff = b.comments.length - a.comments.length;
            if (diff === 0) {
              diff = b.likes - a.likes;
            }
            return diff;
          });
          pictures = discussedPictures;
          break;
        default:
          throw new Error('Неизвестный фильтр: «' + filter.id + '»');
      }
      window.debounce(function () {
        updatePictures();
      });
    }
  });

})();
