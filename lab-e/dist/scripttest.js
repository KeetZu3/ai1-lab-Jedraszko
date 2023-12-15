/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./scripttest.ts ***!
  \***********************/


var greeting = "Hola!";
showAlert(greeting);
document.addEventListener('DOMContentLoaded', function () {
  var linkIdentifiers = ['firstStyle', 'secondStyle', 'thirdStyle'];
  var styleLinks = linkIdentifiers.map(function (id) {
    return document.getElementById(id);
  });
  initializeVisibleStyles(); // Inicjalizacja widocznych stylów na początku
  styleLinks.forEach(function (styleLink, index) {
    styleLink === null || styleLink === void 0 ? void 0 : styleLink.addEventListener('click', function (event) {
      event.preventDefault();
      applyNewStyles("style".concat(index + 1, ".css"));
      displayStyles(styleLink);
      var visibleStyles = initializeVisibleStyles();
      updateStylesContainer(visibleStyles);
    });
  });
  function applyNewStyles(styleSheet) {
    var linkElement = document.querySelector('link[rel="stylesheet"]');
    if (linkElement) {
      linkElement.setAttribute('href', "./css/".concat(styleSheet));
    }
  }
  function displayStyles(activeStyle) {
    styleLinks.forEach(function (styleLink) {
      if (styleLink !== activeStyle) {
        styleLink.style.display = 'inline-block';
      } else styleLink.style.display = 'none';
    });
  }
  function initializeVisibleStyles() {
    var visibleStyles = styleLinks.map(function (styleLink) {
      return "<a href=\"#\" id=\"".concat(styleLink.id, "\">").concat(styleLink.innerText, "</a>");
    }).join(' OR ');
    return visibleStyles;
  }
  function updateStylesContainer(styles) {
    var stylesContainer = document.getElementById('styles-container');
    if (stylesContainer) {
      stylesContainer.innerHTML = styles;
    }
  }
});
function showAlert(message) {
  alert(message);
}
/******/ })()
;