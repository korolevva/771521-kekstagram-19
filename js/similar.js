'use strict';

(function () {
  var onSuccessCreateWizards = function (data) {
    window.addPictures(data);
    window.clickBigPicture(data);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccessCreateWizards, onError);

  // var onSuccessSendForm = function () {
  //   window.setup.setupDialogElement.classList.add('hidden');
  // };

  // var form = window.setup.setupDialogElement.querySelector('.setup-wizard-form');
  // form.addEventListener('submit', function (evt) {
  //   window.backend.save(new FormData(form), onSuccessSendForm, onError);
  //   evt.preventDefault();
  // });
})();
