'use strict';
(function () {
  var uploadFileOpen = document.querySelector('#upload-file');
  var uploadFileClose = document.querySelector('#upload-cancel');
  var imageEditingForm = document.querySelector('.img-upload__overlay');
  var body = document.querySelector('body');
  var form = document.querySelector('.img-upload__form');

  var resetFields = function () {
    window.validationFields.hashtagInput.style.outline = '';
    form.reset();
  };

  var hideForm = function () {
    imageEditingForm.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  var onImageEditingFormOpen = function () {
    imageEditingForm.classList.remove('hidden');
    body.classList.add('modal-open');
    window.form.previewImage.style.transform = 'scale(' + window.data.SCALE_DEFAULT + ')';
    window.form.scaleControlValue.value = window.data.SCALE_MAX + '%';
    document.addEventListener('keydown', onImageEditingFormEsсPress);
  };

  var onImageEditingFormClose = function () {
    window.form.resetEffect();
    resetFields();
    hideForm();
    document.removeEventListener('keydown', onImageEditingFormEsсPress);
  };

  var onImageEditingFormEsсPress = function (evt) {
    if (evt.key === window.data.ESC_KEY && evt.target.className !== 'text__hashtags' && evt.target.className !== 'text__description') {
      window.form.resetEffect();
      resetFields();
      hideForm();
    }
  };

  uploadFileOpen.addEventListener('change', onImageEditingFormOpen);
  uploadFileClose.addEventListener('click', onImageEditingFormClose);

  window.openForm = {
    imageEditingForm: imageEditingForm,
    uploadFileOpen: uploadFileOpen,
    resetFields: resetFields
  };
})();
