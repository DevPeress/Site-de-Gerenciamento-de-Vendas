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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nfunction middleware(request) {\n    const auth = true;\n    const { pathname } = request.nextUrl;\n    if (pathname.startsWith('/dashboard') && !auth) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/login', request.url));\n    }\n    if ((pathname === '/' || pathname === '/login') && auth) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/inicio', request.url));\n    }\n    if (!auth && ![\n        '/',\n        '/login'\n    ].includes(pathname)) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/login', request.url));\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBd0Q7QUFFakQsU0FBU0MsV0FBV0MsT0FBb0I7SUFFM0MsTUFBTUMsT0FBTztJQUViLE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUdGLFFBQVFHLE9BQU87SUFFcEMsSUFBSUQsU0FBU0UsVUFBVSxDQUFDLGlCQUFpQixDQUFDSCxNQUFNO1FBQzVDLE9BQU9ILHFEQUFZQSxDQUFDTyxRQUFRLENBQUMsSUFBSUMsSUFBSSxVQUFVTixRQUFRTyxHQUFHO0lBQzlEO0lBRUEsSUFBSSxDQUFDTCxhQUFhLE9BQU9BLGFBQWEsUUFBTyxLQUFNRCxNQUFNO1FBQ3JELE9BQU9ILHFEQUFZQSxDQUFDTyxRQUFRLENBQUMsSUFBSUMsSUFBSSxXQUFXTixRQUFRTyxHQUFHO0lBQzdEO0lBRUEsSUFBSSxDQUFDTixRQUFRLENBQUM7UUFBQztRQUFLO0tBQVMsQ0FBQ08sUUFBUSxDQUFDTixXQUFXO1FBQ2hELE9BQU9KLHFEQUFZQSxDQUFDTyxRQUFRLENBQUMsSUFBSUMsSUFBSSxVQUFVTixRQUFRTyxHQUFHO0lBQzVEO0lBRUYsT0FBT1QscURBQVlBLENBQUNXLElBQUk7QUFDNUIiLCJzb3VyY2VzIjpbIkM6XFxQcm9ncmFtYcOnw6NvXFxTaXRlXFxzcmNcXG1pZGRsZXdhcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1pZGRsZXdhcmUocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICAgIFxyXG4gICAgY29uc3QgYXV0aCA9IHRydWVcclxuXHJcbiAgICBjb25zdCB7IHBhdGhuYW1lIH0gPSByZXF1ZXN0Lm5leHRVcmw7XHJcblxyXG4gICAgaWYgKHBhdGhuYW1lLnN0YXJ0c1dpdGgoJy9kYXNoYm9hcmQnKSAmJiAhYXV0aCkge1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UucmVkaXJlY3QobmV3IFVSTCgnL2xvZ2luJywgcmVxdWVzdC51cmwpKVxyXG4gICAgfVxyXG5cclxuICAgIGlmICgocGF0aG5hbWUgPT09ICcvJyB8fCBwYXRobmFtZSA9PT0gJy9sb2dpbicpICYmIGF1dGgpIHtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLnJlZGlyZWN0KG5ldyBVUkwoJy9pbmljaW8nLCByZXF1ZXN0LnVybCkpO1xyXG4gICAgICB9XHJcbiAgICBcclxuICAgICAgaWYgKCFhdXRoICYmICFbJy8nLCAnL2xvZ2luJ10uaW5jbHVkZXMocGF0aG5hbWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdChuZXcgVVJMKCcvbG9naW4nLCByZXF1ZXN0LnVybCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5uZXh0KClcclxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJtaWRkbGV3YXJlIiwicmVxdWVzdCIsImF1dGgiLCJwYXRobmFtZSIsIm5leHRVcmwiLCJzdGFydHNXaXRoIiwicmVkaXJlY3QiLCJVUkwiLCJ1cmwiLCJpbmNsdWRlcyIsIm5leHQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.ts\n");

/***/ })

});