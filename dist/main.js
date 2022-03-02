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

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Init\": () => (/* binding */ Init)\n/* harmony export */ });\n/* harmony import */ var _Functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Functions */ \"./src/Functions.js\");\n\r\n\r\nfunction Init() {\r\n  DOM.Search()\r\n  DOM.ToggleUnit()\r\n  DOM.Render('auckland')\r\n}\r\n\r\nconst DOM = (function(){\r\n  let CITY_ID = ''\r\n  let UNIT_ID = ''\r\n\r\n  function Search() {\r\n    document\r\n      .getElementById('search')\r\n      .addEventListener('click', function() {\r\n        const input = document.querySelector('input[type=\"text\"]')\r\n        input.style.display = 'flex'\r\n        input.setAttribute('autofocus', true)\r\n        input.classList.remove('hide')\r\n        input.focus()\r\n        input.addEventListener('blur', handleBlur)\r\n        input.addEventListener('keypress', handleEnter)\r\n      })\r\n  }\r\n\r\n  function ToggleUnit() {\r\n    document\r\n      .getElementById('unit-display')\r\n      .addEventListener('click', handleToggler)\r\n  }\r\n  \r\n  async function Render(city, unit) {\r\n    CITY_ID = city\r\n    UNIT_ID = unit\r\n\r\n    console.log(CITY_ID, UNIT_ID)\r\n    const data = await (0,_Functions__WEBPACK_IMPORTED_MODULE_0__.getWeather)(city, unit)\r\n    DOMRender(data.description, data.city_country, data.feels_like, data.humidity, data.wind_speed, data.temp)\r\n  }\r\n  \r\n  function handleToggler() {\r\n    let unit = this.children[0]\r\n    unit.innerHTML = unit.textContent === '°F' ? '°C' : '°F'\r\n\r\n    let metric = unit.textContent === '°F' ? 'imperial' : 'metric'\r\n    UNIT_ID = metric\r\n    // console.log(CITY_ID, UNIT_ID)\r\n    Render(CITY_ID, UNIT_ID)\r\n  }\r\n  \r\n  function handleBlur() {\r\n    console.log(this)\r\n    if (window.innerWidth < 700)  {\r\n      this.style.display = 'none'\r\n      this.value = ''\r\n    }\r\n  }\r\n  \r\n  function handleEnter(e) {\r\n    if (e.key === 'Enter') {\r\n      CITY_ID = this.value.toLowerCase()\r\n      console.log(CITY_ID, UNIT_ID)\r\n      Render(CITY_ID, UNIT_ID)\r\n      this.value = ''\r\n    }\r\n  }\r\n\r\n  function DOMRender(desc, city, feels_like, humidity, wind_speed, temp) {\r\n    document\r\n      .getElementById('time')\r\n      .innerHTML = (0,_Functions__WEBPACK_IMPORTED_MODULE_0__.getCurrentTime)()\r\n  \r\n    document\r\n      .getElementById('date')\r\n      .innerHTML = (0,_Functions__WEBPACK_IMPORTED_MODULE_0__.getCurrentDate)()\r\n  \r\n    document\r\n      .getElementById('day-night')\r\n      .innerHTML = (0,_Functions__WEBPACK_IMPORTED_MODULE_0__.nightAndDay)()\r\n  \r\n    document\r\n      .getElementById('weather')\r\n      .innerHTML = desc\r\n  \r\n    document\r\n      .getElementById('city')\r\n      .innerHTML = city\r\n  \r\n    document\r\n      .getElementById('feels-like')\r\n      .innerHTML = feels_like\r\n  \r\n    document\r\n      .getElementById('humidity')\r\n      .innerHTML = humidity\r\n  \r\n    document\r\n      .getElementById('wind-speed')\r\n      .innerHTML = wind_speed\r\n    \r\n    document  \r\n      .getElementById('temp')\r\n      .innerHTML = temp\r\n  }\r\n\r\n  return {\r\n    Search,\r\n    ToggleUnit,\r\n    Render\r\n  }\r\n})()\n\n//# sourceURL=webpack://weatherapp/./src/DOM.js?");

/***/ }),

/***/ "./src/Functions.js":
/*!**************************!*\
  !*** ./src/Functions.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getWeather\": () => (/* binding */ getWeather),\n/* harmony export */   \"getCurrentTime\": () => (/* binding */ getCurrentTime),\n/* harmony export */   \"getCurrentDate\": () => (/* binding */ getCurrentDate),\n/* harmony export */   \"nightAndDay\": () => (/* binding */ nightAndDay)\n/* harmony export */ });\n\r\n//metric - Celsius\r\n//imperial - Fahrenheit\r\n\r\n\r\nconst getWeather = async (city, unit = 'metric') => {\r\n  const _key = '7b0b1dcfbedaa9bb988c8c3115985fe5'\r\n  const response = await fetch(\r\n    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${_key}&units=${unit}`, \r\n    {mode: 'cors'}\r\n  )\r\n  const data = await response.json()\r\n  const result = {\r\n    description: data.weather[0].description,\r\n    city_country: `${data.name}, ${data.sys.country}`,\r\n    wind_speed: `${data.wind.speed} ${windMetric(unit)}`,\r\n    humidity: `${data.main.humidity}%`,\r\n    feels_like: `${data.main.feels_like} ${unitMetric(unit)}`,\r\n    temp: `${data.main.temp} ${unitMetric(unit)}`\r\n  }\r\n  return result\r\n}\r\n\r\nconst unitMetric = (unit) => unit === 'metric' ? '°C' : '°F'\r\nconst windMetric = (unit) => unit === 'imperial' ? 'mph': 'km/h'\r\n\r\nconst dateAndTime =(function() {\r\n  const currentDate = new Date()\r\n  const currentHour = currentDate.getHours()\r\n  const currentMinute = currentDate.getMinutes()\r\n\r\n  const getCurrentDate = () => {\r\n    const day = currentDate.getDate()\r\n    const month = currentDate.getMonth() + 1\r\n    const year = currentDate.getFullYear()\r\n\r\n    return new Date(`${month}-${day}-${year}`).toLocaleString(\"en-US\", { \r\n      weekday: 'long',\r\n      day: 'numeric',\r\n      month: \"short\",\r\n      year: 'numeric' \r\n    })\r\n  }\r\n\r\n  const getCurrentTime = () => {\r\n    const time = `${getHours()}:${getMinutes()} ${getMeridiem()}`\r\n    return time\r\n  }\r\n  \r\n  const getHours = () => {\r\n    let hour = currentHour\r\n    hour = (hour > 12) ? hour - 12 : hour\r\n    return (hour < 10) ? `0${hour}` : hour\r\n  }\r\n\r\n  const getMinutes = () => {\r\n    let minute = currentMinute\r\n    return minute < 10 ? `0${minute}` : minute\r\n  }\r\n\r\n  const getMeridiem = () => {\r\n    let hour = currentHour\r\n    return hour > 12 ? 'PM' : 'AM'\r\n  }\r\n\r\n  const nightAndDay = () => {\r\n    let hour = currentHour\r\n    return hour > 16 || hour < 4 ? 'Night' : 'Day'\r\n  }\r\n\r\n  return {\r\n    getCurrentDate,\r\n    getCurrentTime,\r\n    nightAndDay\r\n  }\r\n})()\r\n\r\nconst {getCurrentDate, getCurrentTime, nightAndDay} = dateAndTime\r\n\r\n\n\n//# sourceURL=webpack://weatherapp/./src/Functions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ \"./src/DOM.js\");\n\r\n\r\n(0,_DOM__WEBPACK_IMPORTED_MODULE_0__.Init)()\n\n//# sourceURL=webpack://weatherapp/./src/index.js?");

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