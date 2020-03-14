'use strict';
(function () {
  var uploadFileOpen = document.querySelector('#upload-file');
  var uploadFileClose = document.querySelector('#upload-cancel');
  var imageEditingForm = document.querySelector('.img-upload__overlay');

  window.openForm = {
    imageEditingForm: imageEditingForm,
    uploadFileOpen: uploadFileOpen
  };

  function onImageEditingFormOpen() {
    imageEditingForm.classList.remove('hidden');
    window.data.body.classList.add('modal-open');
    window.form.previewImage.style.transform = 'scale(' + window.data.SCALE_DEFAULT + ')';
    window.form.scaleControlValue.value = window.data.SCALE_MAX + '%';
    document.addEventListener('keydown', onImageEditingFormEsсPress);
  }

  function onImageEditingFormClose() {
    window.form.resetEffect();
    imageEditingForm.classList.add('hidden');
    uploadFileOpen.value = '';
    window.data.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onImageEditingFormEsсPress);
  }

  function onImageEditingFormEsсPress(evt) {
    if (evt.key === window.data.ESC_KEY && evt.target.className !== 'text__hashtags' && evt.target.className !== 'text__description') {
      window.form.resetEffect();
      imageEditingForm.classList.add('hidden');
      uploadFileOpen.value = '';
      window.data.body.classList.remove('modal-open');
    }
  }

  uploadFileOpen.addEventListener('change', onImageEditingFormOpen);
  uploadFileClose.addEventListener('click', onImageEditingFormClose);
})();
