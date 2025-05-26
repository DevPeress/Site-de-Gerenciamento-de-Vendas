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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nasync function middleware(request) {\n    const { pathname } = request.nextUrl;\n    const auth = request.cookies.get('auth');\n    if (pathname === '/' && auth) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/inicio', request.url));\n    }\n    if (pathname !== '/login' && !auth) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(new URL('/login', request.url));\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n}\nconst config = {\n    matcher: [\n        '/',\n        '/inicio',\n        '/conta',\n        '/configuracoes',\n        '/compradores',\n        '/registrar'\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXdEO0FBRWpELGVBQWVDLFdBQVdDLE9BQW9CO0lBQ2pELE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUdELFFBQVFFLE9BQU87SUFDcEMsTUFBTUMsT0FBT0gsUUFBUUksT0FBTyxDQUFDQyxHQUFHLENBQUM7SUFFakMsSUFBSUosYUFBYSxPQUFRRSxNQUFNO1FBQzNCLE9BQU9MLHFEQUFZQSxDQUFDUSxRQUFRLENBQUMsSUFBSUMsSUFBSSxXQUFXUCxRQUFRUSxHQUFHO0lBQy9EO0lBRUEsSUFBSVAsYUFBYSxZQUFZLENBQUNFLE1BQU07UUFDaEMsT0FBT0wscURBQVlBLENBQUNRLFFBQVEsQ0FBQyxJQUFJQyxJQUFJLFVBQVVQLFFBQVFRLEdBQUc7SUFDOUQ7SUFFQSxPQUFPVixxREFBWUEsQ0FBQ1csSUFBSTtBQUM1QjtBQUVPLE1BQU1DLFNBQVM7SUFDcEJDLFNBQVM7UUFBQztRQUFLO1FBQVc7UUFBVTtRQUFrQjtRQUFnQjtLQUFhO0FBQ3JGLEVBQUUiLCJzb3VyY2VzIjpbIkM6XFxQcm9ncmFtYcOnw6NvXFxTaXRlXFxzcmNcXG1pZGRsZXdhcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1pZGRsZXdhcmUocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICAgIGNvbnN0IHsgcGF0aG5hbWUgfSA9IHJlcXVlc3QubmV4dFVybDtcclxuICAgIGNvbnN0IGF1dGggPSByZXF1ZXN0LmNvb2tpZXMuZ2V0KCdhdXRoJyk7XHJcblxyXG4gICAgaWYgKHBhdGhuYW1lID09PSAnLycgICYmIGF1dGgpIHtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLnJlZGlyZWN0KG5ldyBVUkwoJy9pbmljaW8nLCByZXF1ZXN0LnVybCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwYXRobmFtZSAhPT0gJy9sb2dpbicgJiYgIWF1dGgpIHtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLnJlZGlyZWN0KG5ldyBVUkwoJy9sb2dpbicsIHJlcXVlc3QudXJsKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5uZXh0KClcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcclxuICBtYXRjaGVyOiBbJy8nLCAnL2luaWNpbycsICcvY29udGEnLCAnL2NvbmZpZ3VyYWNvZXMnLCAnL2NvbXByYWRvcmVzJywgJy9yZWdpc3RyYXInXSxcclxufTsiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwibWlkZGxld2FyZSIsInJlcXVlc3QiLCJwYXRobmFtZSIsIm5leHRVcmwiLCJhdXRoIiwiY29va2llcyIsImdldCIsInJlZGlyZWN0IiwiVVJMIiwidXJsIiwibmV4dCIsImNvbmZpZyIsIm1hdGNoZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.ts\n");

/***/ })

});