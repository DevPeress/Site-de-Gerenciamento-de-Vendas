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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nasync function middleware(request) {\n    const { pathname } = request.nextUrl;\n    const auth = request.cookies.get('auth');\n    if ((pathname === '/' || pathname === '/cadastro') && auth) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/inicio', request.url));\n    }\n    if (pathname !== '/login' && !auth) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/login', request.url));\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\nconst config = {\n    matcher: [\n        '/',\n        '/inicio',\n        '/conta',\n        '/configuracoes',\n        '/compradores',\n        '/registrar',\n        '/cad'\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXdEO0FBRWpELGVBQWVDLFdBQVdDLE9BQW9CO0lBQ2pELE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUdELFFBQVFFLE9BQU87SUFDcEMsTUFBTUMsT0FBT0gsUUFBUUksT0FBTyxDQUFDQyxHQUFHLENBQUM7SUFFakMsSUFBSSxDQUFDSixhQUFhLE9BQU9BLGFBQWEsV0FBVSxLQUFPRSxNQUFNO1FBQ3pELE9BQU9MLHFEQUFZQSxDQUFDUSxRQUFRLENBQUMsSUFBSUMsSUFBSSxXQUFXUCxRQUFRUSxHQUFHO0lBQy9EO0lBRUEsSUFBSVAsYUFBYSxZQUFZLENBQUNFLE1BQU07UUFDaEMsT0FBT0wscURBQVlBLENBQUNRLFFBQVEsQ0FBQyxJQUFJQyxJQUFJLFVBQVVQLFFBQVFRLEdBQUc7SUFDOUQ7SUFFQSxPQUFPVixxREFBWUEsQ0FBQ1csSUFBSTtBQUM1QjtBQUVPLE1BQU1DLFNBQVM7SUFDcEJDLFNBQVM7UUFBQztRQUFLO1FBQVc7UUFBVTtRQUFrQjtRQUFnQjtRQUFjO0tBQU87QUFDN0YsRUFBRSIsInNvdXJjZXMiOlsiQzpcXFByb2dyYW1hw6fDo29cXFNpdGVcXHNyY1xcbWlkZGxld2FyZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWlkZGxld2FyZShyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xyXG4gICAgY29uc3QgeyBwYXRobmFtZSB9ID0gcmVxdWVzdC5uZXh0VXJsO1xyXG4gICAgY29uc3QgYXV0aCA9IHJlcXVlc3QuY29va2llcy5nZXQoJ2F1dGgnKTtcclxuXHJcbiAgICBpZiAoKHBhdGhuYW1lID09PSAnLycgfHwgcGF0aG5hbWUgPT09ICcvY2FkYXN0cm8nICkgJiYgYXV0aCkge1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UucmVkaXJlY3QobmV3IFVSTCgnL2luaWNpbycsIHJlcXVlc3QudXJsKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBhdGhuYW1lICE9PSAnL2xvZ2luJyAmJiAhYXV0aCkge1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UucmVkaXJlY3QobmV3IFVSTCgnL2xvZ2luJywgcmVxdWVzdC51cmwpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLm5leHQoKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xyXG4gIG1hdGNoZXI6IFsnLycsICcvaW5pY2lvJywgJy9jb250YScsICcvY29uZmlndXJhY29lcycsICcvY29tcHJhZG9yZXMnLCAnL3JlZ2lzdHJhcicsICcvY2FkJ10sXHJcbn07Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIm1pZGRsZXdhcmUiLCJyZXF1ZXN0IiwicGF0aG5hbWUiLCJuZXh0VXJsIiwiYXV0aCIsImNvb2tpZXMiLCJnZXQiLCJyZWRpcmVjdCIsIlVSTCIsInVybCIsIm5leHQiLCJjb25maWciLCJtYXRjaGVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.ts\n");

/***/ })

});