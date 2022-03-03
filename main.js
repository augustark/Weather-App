/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./keys.js":
/*!*****************!*\
  !*** ./keys.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"weatherKey\": () => (/* binding */ weatherKey),\n/* harmony export */   \"unsplashKey\": () => (/* binding */ unsplashKey)\n/* harmony export */ });\nconst weatherKey = () => '7b0b1dcfbedaa9bb988c8c3115985fe5'\r\nconst unsplashKey = () => 'nN03rvK7REkwixq6ShB_2yJC7RPFWp9jh0JO4ZNQ9Gw'\n\n//# sourceURL=webpack://weatherapp/./keys.js?");

/***/ }),

/***/ "./src/API.js":
/*!********************!*\
  !*** ./src/API.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getWeather\": () => (/* binding */ getWeather),\n/* harmony export */   \"getImage\": () => (/* binding */ getImage)\n/* harmony export */ });\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../keys */ \"./keys.js\");\n\r\n\r\nconst getWeather = async (city, unit = 'metric') => {\r\n  try {\r\n    const response = await fetch(\r\n      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${(0,_keys__WEBPACK_IMPORTED_MODULE_0__.weatherKey)()}&units=${unit}`, \r\n      {mode: 'cors'}\r\n    )\r\n    const data = await response.json()\r\n    const result = {\r\n      description: data.weather[0].description,\r\n      city_country: `${data.name}, ${data.sys.country}`,\r\n      wind_speed: `${data.wind.speed} ${windMetric(unit)}`,\r\n      humidity: `${data.main.humidity}%`,\r\n      feels_like: `${data.main.feels_like} ${unitMetric(unit)}`,\r\n      temp: `${data.main.temp} ${unitMetric(unit)}`,\r\n      iconUrl: getIcon(data.weather[0].icon),\r\n      timezone: data.timezone\r\n    }\r\n    return result\r\n  } catch(error) {\r\n    console.log('Error: ', error)\r\n  }\r\n  \r\n}\r\n\r\nconst unitMetric = (unit) => unit === 'metric' ? '°C' : '°F'\r\nconst windMetric = (unit) => unit === 'imperial' ? 'mph': 'km/h'\r\nconst getIcon = (id) => `http://openweathermap.org/img/wn/${id}@4x.png`\r\n\r\nconst getImage = async (id) => {\r\n  let result\r\n  await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=${id}&client_id=${(0,_keys__WEBPACK_IMPORTED_MODULE_0__.unsplashKey)()}`, {mode: 'cors'})\r\n    .then(response => response.json())\r\n    .then(data => result = data)\r\n    .catch(error => console.log('Error: ', error))\r\n\r\n  return result\r\n}\r\n\r\n\n\n//# sourceURL=webpack://weatherapp/./src/API.js?");

/***/ }),

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Init)\n/* harmony export */ });\n/* harmony import */ var _Date_Time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Date_Time */ \"./src/Date_Time.js\");\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./API */ \"./src/API.js\");\n\r\n\r\n\r\nfunction Init() {\r\n  DOM.Render('London')\r\n}\r\n\r\nconst DOM = (function(){\r\n  let CITY_ID = ''\r\n  let UNIT_ID = ''\r\n  \r\n  async function Render(city, unit) {\r\n    CITY_ID = city\r\n    UNIT_ID = unit\r\n\r\n    const data = await (0,_API__WEBPACK_IMPORTED_MODULE_1__.getWeather)(city, unit)\r\n    const input = document.querySelector('input[type=\"text\"]')\r\n    if (data) {\r\n        input.placeholder = 'Search location'\r\n        DOMRender(data)\r\n    } else {\r\n      input.placeholder = 'Location not found'\r\n    }\r\n  }\r\n\r\n  async function renderImage(query) {\r\n    let q = [\r\n      ...query.split(' '), \r\n      (0,_Date_Time__WEBPACK_IMPORTED_MODULE_0__.getNightDay)().toLowerCase()\r\n    ].join('+')\r\n\r\n    let img = await (0,_API__WEBPACK_IMPORTED_MODULE_1__.getImage)(q)\r\n\r\n    document\r\n      .documentElement\r\n      .style.setProperty('--bg', `url(${imgFull})`); \r\n    \r\n    const credit = document.getElementById('credit')\r\n    credit.innerHTML = img.user.name\r\n    credit.parentElement.href = img.user.portfolio_url\r\n  }\r\n  \r\n  function handleToggler() {\r\n    let unit = this.children[0]\r\n    unit.innerHTML = unit.textContent === '°F' ? '°C' : '°F'\r\n    UNIT_ID = unit.textContent === '°F' ? 'imperial' : 'metric'\r\n    Render(CITY_ID, UNIT_ID)\r\n  }\r\n  \r\n  function handleBlur() {\r\n    if (window.innerWidth < 700)  {\r\n      this.style.display = 'none'\r\n      this.value = ''\r\n    }\r\n  }\r\n  \r\n  function handleEnter(e) {\r\n    if (e.key === 'Enter') {\r\n      CITY_ID = this.value.toLowerCase()\r\n      Render(CITY_ID, UNIT_ID)\r\n      this.value = ''\r\n    }\r\n  }\r\n\r\n  function handleInput() {\r\n      const input = document.querySelector('input[type=\"text\"]')\r\n      input.style.display = 'flex'\r\n      input.setAttribute('autofocus', true)\r\n      input.classList.remove('hide')\r\n      input.focus()\r\n      input.addEventListener('blur', handleBlur)\r\n      input.addEventListener('keypress', handleEnter)\r\n  }\r\n\r\n  function DOMRender(data) {\r\n    document\r\n      .getElementById('search')\r\n      .addEventListener('click', handleInput)\r\n\r\n    document\r\n      .getElementById('unit-display')\r\n      .addEventListener('click', handleToggler)\r\n\r\n    document\r\n      .getElementById('time')\r\n      .innerHTML = (0,_Date_Time__WEBPACK_IMPORTED_MODULE_0__.getCurrentTime)(data.timezone)\r\n  \r\n    document\r\n      .getElementById('date')\r\n      .innerHTML = (0,_Date_Time__WEBPACK_IMPORTED_MODULE_0__.getCurrentDate)()\r\n  \r\n    document\r\n      .getElementById('day-night')\r\n      .innerHTML = (0,_Date_Time__WEBPACK_IMPORTED_MODULE_0__.getNightDay)()\r\n  \r\n    document\r\n      .getElementById('weather')\r\n      .innerHTML = data.description\r\n  \r\n    document\r\n      .getElementById('city')\r\n      .innerHTML = data.city_country\r\n  \r\n    document\r\n      .getElementById('feels-like')\r\n      .innerHTML = data.feels_like\r\n  \r\n    document\r\n      .getElementById('humidity')\r\n      .innerHTML = data.humidity\r\n  \r\n    document\r\n      .getElementById('wind-speed')\r\n      .innerHTML = data.wind_speed\r\n    \r\n    document  \r\n      .getElementById('temp')\r\n      .innerHTML = data.temp\r\n\r\n    document\r\n      .getElementById('today-icon')\r\n      .src = data.iconUrl\r\n    \r\n    // document\r\n      // .documentElement\r\n      // .style.setProperty('--bg', renderImage(data.description));\r\n    \r\n    // document.body.style.backgroundImage = renderImage(data.description)\r\n    renderImage(data.description)\r\n  }\r\n\r\n  return {\r\n    Render\r\n  }\r\n})()\n\n//# sourceURL=webpack://weatherapp/./src/DOM.js?");

/***/ }),

/***/ "./src/Date_Time.js":
/*!**************************!*\
  !*** ./src/Date_Time.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCurrentDate\": () => (/* binding */ getCurrentDate),\n/* harmony export */   \"getCurrentTime\": () => (/* binding */ getCurrentTime),\n/* harmony export */   \"getNightDay\": () => (/* binding */ getNightDay)\n/* harmony export */ });\nconst D_T =(function() {\r\n  const currentDate = new Date()\r\n  let currentDay\r\n\r\n  const getCurrentDate = () => {\r\n    const day = currentDate.getDate()\r\n    const month = currentDate.getMonth() + 1\r\n    const year = currentDate.getFullYear()\r\n\r\n    return new Date(`${month}-${day}-${year}`).toLocaleString(\"en-US\", { \r\n      weekday: 'long',\r\n      day: 'numeric',\r\n      month: \"short\",\r\n      year: 'numeric' \r\n    })\r\n  }\r\n\r\n  const getCurrentTime = (timezone) => {\r\n    const utc = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000)\r\n    currentDay = new Date(utc + (1000 * timezone)).toLocaleTimeString([], {hour: '2-digit'})\r\n    return new Date(utc + (1000 * timezone)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})\r\n  }\r\n\r\n  const getNightDay = () => {\r\n    let hour = parseInt(currentDay.slice(0, 2))\r\n    return hour > 16 || hour < 4 ? 'Night' : 'Day'\r\n  }\r\n\r\n  return {\r\n    getCurrentDate,\r\n    getCurrentTime,\r\n    getNightDay\r\n  }\r\n})()\r\n\r\nconst {getCurrentDate, getCurrentTime, getNightDay} = D_T\n\n//# sourceURL=webpack://weatherapp/./src/Date_Time.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ \"./src/DOM.js\");\n\r\n\r\n(0,_DOM__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\n\n//# sourceURL=webpack://weatherapp/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;