'use strict';
(function () {
  window.debounce = function (callback, ms) {
    var isCooldown = false;

    return function () {
      if (isCooldown) {
        return;
      }

      callback.apply(null, arguments);
      isCooldown = true;

      setTimeout(function () {
        isCooldown = false;
      }, ms);
    };
  };
})();
