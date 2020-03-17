'use strict';
(function () {
  var uploadFileOpen = document.querySelector('#upload-file');
  var uploadFileClose = document.querySelector('#upload-cancel');
  var imageEditingForm = document.querySelector('.img-upload__overlay');
  var body = document.querySelector('body');

  var onImageEditingFormOpen = function () {
    imageEditingForm.classList.remove('hidden');
    body.classList.add('modal-open');
    window.form.previewImage.style.transform = 'scale(' + window.data.SCALE_DEFAULT + ')';
    window.form.scaleControlValue.value = window.data.SCALE_MAX + '%';
    document.addEventListener('keydown', onImageEditingFormEsсPress);
  };

  var onImageEditingFormClose = function () {
    window.form.resetEffect();
    window.validationFields.hashtagInput.style.outline = '';
    uploadFileOpen.value = '';
    imageEditingForm.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onImageEditingFormEsсPress);
  };

  var onImageEditingFormEsсPress = function (evt) {
    if (evt.key === window.data.ESC_KEY && evt.target.className !== 'text__hashtags' && evt.target.className !== 'text__description') {
      window.form.resetEffect();
      window.validationFields.hashtagInput.style.outline = '';
      window.validationFields.hashtagInput.value = '';
      window.validationFields.textDescription.value = '';
      uploadFileOpen.value = '';
      imageEditingForm.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  };

  uploadFileOpen.addEventListener('change', onImageEditingFormOpen);
  uploadFileClose.addEventListener('click', onImageEditingFormClose);

  window.openForm = {
    imageEditingForm: imageEditingForm,
    uploadFileOpen: uploadFileOpen
  };
})();
