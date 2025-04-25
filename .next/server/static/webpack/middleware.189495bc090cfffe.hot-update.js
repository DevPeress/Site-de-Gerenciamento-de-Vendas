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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nfunction middleware(request) {\n    const auth = true;\n    const { pathname } = request.nextUrl;\n    if (pathname.startsWith('/dashboard') && !auth) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/login', request.url));\n    }\n    if ((pathname === '/' || pathname === '/login') && auth) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/compradores', request.url));\n    }\n    if (!auth && ![\n        '/',\n        '/login'\n    ].includes(pathname)) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/login', request.url));\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBd0Q7QUFFakQsU0FBU0MsV0FBV0MsT0FBb0I7SUFFM0MsTUFBTUMsT0FBTztJQUViLE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUdGLFFBQVFHLE9BQU87SUFFcEMsSUFBSUQsU0FBU0UsVUFBVSxDQUFDLGlCQUFpQixDQUFDSCxNQUFNO1FBQzVDLE9BQU9ILHFEQUFZQSxDQUFDTyxRQUFRLENBQUMsSUFBSUMsSUFBSSxVQUFVTixRQUFRTyxHQUFHO0lBQzlEO0lBRUEsSUFBSSxDQUFDTCxhQUFhLE9BQU9BLGFBQWEsUUFBTyxLQUFNRCxNQUFNO1FBQ3JELE9BQU9ILHFEQUFZQSxDQUFDTyxRQUFRLENBQUMsSUFBSUMsSUFBSSxnQkFBZ0JOLFFBQVFPLEdBQUc7SUFDcEU7SUFFQSxJQUFJLENBQUNOLFFBQVEsQ0FBQztRQUFDO1FBQUs7S0FBUyxDQUFDTyxRQUFRLENBQUNOLFdBQVc7UUFDOUMsT0FBT0oscURBQVlBLENBQUNPLFFBQVEsQ0FBQyxJQUFJQyxJQUFJLFVBQVVOLFFBQVFPLEdBQUc7SUFDOUQ7SUFFQSxPQUFPVCxxREFBWUEsQ0FBQ1csSUFBSTtBQUM1QiIsInNvdXJjZXMiOlsiQzpcXFByb2dyYW1hw6fDo29cXFNpdGVcXHNyY1xcbWlkZGxld2FyZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWlkZGxld2FyZShyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xyXG4gICAgXHJcbiAgICBjb25zdCBhdXRoID0gdHJ1ZVxyXG5cclxuICAgIGNvbnN0IHsgcGF0aG5hbWUgfSA9IHJlcXVlc3QubmV4dFVybDtcclxuXHJcbiAgICBpZiAocGF0aG5hbWUuc3RhcnRzV2l0aCgnL2Rhc2hib2FyZCcpICYmICFhdXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdChuZXcgVVJMKCcvbG9naW4nLCByZXF1ZXN0LnVybCkpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKChwYXRobmFtZSA9PT0gJy8nIHx8IHBhdGhuYW1lID09PSAnL2xvZ2luJykgJiYgYXV0aCkge1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UucmVkaXJlY3QobmV3IFVSTCgnL2NvbXByYWRvcmVzJywgcmVxdWVzdC51cmwpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKCFhdXRoICYmICFbJy8nLCAnL2xvZ2luJ10uaW5jbHVkZXMocGF0aG5hbWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdChuZXcgVVJMKCcvbG9naW4nLCByZXF1ZXN0LnVybCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UubmV4dCgpXHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwibWlkZGxld2FyZSIsInJlcXVlc3QiLCJhdXRoIiwicGF0aG5hbWUiLCJuZXh0VXJsIiwic3RhcnRzV2l0aCIsInJlZGlyZWN0IiwiVVJMIiwidXJsIiwiaW5jbHVkZXMiLCJuZXh0Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.ts\n");

/***/ })

});