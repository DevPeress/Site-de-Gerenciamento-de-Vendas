"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./src/middleware.ts":
/*!***************************!*\
  !*** ./src/middleware.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nfunction middleware(request) {\n    const auth = true;\n    const { pathname } = request.nextUrl;\n    if ((pathname === '/' || pathname === '/login') && auth) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/inicio', request.url));\n    }\n    if (!auth && ![\n        '/',\n        '/login'\n    ].includes(pathname)) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/login', request.url));\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBd0Q7QUFFakQsU0FBU0MsV0FBV0MsT0FBb0I7SUFFM0MsTUFBTUMsT0FBTztJQUViLE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUdGLFFBQVFHLE9BQU87SUFFcEMsSUFBSSxDQUFDRCxhQUFhLE9BQU9BLGFBQWEsUUFBTyxLQUFNRCxNQUFNO1FBQ3JELE9BQU9ILHFEQUFZQSxDQUFDTSxRQUFRLENBQUMsSUFBSUMsSUFBSSxXQUFXTCxRQUFRTSxHQUFHO0lBQy9EO0lBRUEsSUFBSSxDQUFDTCxRQUFRLENBQUM7UUFBQztRQUFLO0tBQVMsQ0FBQ00sUUFBUSxDQUFDTCxXQUFXO1FBQzlDLE9BQU9KLHFEQUFZQSxDQUFDTSxRQUFRLENBQUMsSUFBSUMsSUFBSSxVQUFVTCxRQUFRTSxHQUFHO0lBQzlEO0lBRUEsT0FBT1IscURBQVlBLENBQUNVLElBQUk7QUFDNUIiLCJzb3VyY2VzIjpbIkM6XFxQcm9ncmFtYcOnw6NvXFxTaXRlXFxzcmNcXG1pZGRsZXdhcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1pZGRsZXdhcmUocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICAgIFxyXG4gICAgY29uc3QgYXV0aCA9IHRydWVcclxuXHJcbiAgICBjb25zdCB7IHBhdGhuYW1lIH0gPSByZXF1ZXN0Lm5leHRVcmw7XHJcblxyXG4gICAgaWYgKChwYXRobmFtZSA9PT0gJy8nIHx8IHBhdGhuYW1lID09PSAnL2xvZ2luJykgJiYgYXV0aCkge1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UucmVkaXJlY3QobmV3IFVSTCgnL2luaWNpbycsIHJlcXVlc3QudXJsKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICghYXV0aCAmJiAhWycvJywgJy9sb2dpbiddLmluY2x1ZGVzKHBhdGhuYW1lKSkge1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UucmVkaXJlY3QobmV3IFVSTCgnL2xvZ2luJywgcmVxdWVzdC51cmwpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLm5leHQoKVxyXG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIm1pZGRsZXdhcmUiLCJyZXF1ZXN0IiwiYXV0aCIsInBhdGhuYW1lIiwibmV4dFVybCIsInJlZGlyZWN0IiwiVVJMIiwidXJsIiwiaW5jbHVkZXMiLCJuZXh0Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.ts\n");

/***/ })

});