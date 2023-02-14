"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "next-auth/providers/google":
/*!*********************************************!*\
  !*** external "next-auth/providers/google" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/google");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].js":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"next-auth/providers/google\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    providers: [\n        // OAuth authentication providers...\n        next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default()({\n            clientId: process.env.NEXTAUTH_GOOGLE_ID,\n            clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET\n        }),\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2___default()({\n            name: \"Credentials\",\n            async authorize (credentials, req) {\n                const data = {\n                    email: credentials.email,\n                    password: credentials.password\n                };\n                const options = {\n                    method: \"POST\",\n                    headers: {\n                        \"Content-type\": \"application/json\"\n                    },\n                    body: JSON.stringify(data)\n                };\n                // Add logic here to look up the user from the credentials supplied\n                let user = await fetch(\"https://mercurius-backend.up.railway.app/api/users/verify/\", options).then((res)=>res.json());\n                if (user.fullname) {\n                    // Any object returned will be saved in `user` property of the JWT\n                    const loginUser = await fetch(\"https://mercurius-backend.up.railway.app/api/users/login/\", options).then((res)=>res.json());\n                    if (loginUser.error) {\n                        return null;\n                    } else {\n                        return user;\n                    }\n                } else {\n                    // If you return null then an error will be displayed advising the user to check their details.\n                    return null;\n                }\n            }\n        })\n    ]\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBaUM7QUFDdUI7QUFDVTtBQUVsRSxpRUFBZUEsZ0RBQVFBLENBQUM7SUFDdEJHLFdBQVc7UUFDVCxvQ0FBb0M7UUFDcENGLGlFQUFjQSxDQUFDO1lBQ2JHLFVBQVVDLFFBQVFDLEdBQUcsQ0FBQ0Msa0JBQWtCO1lBQ3hDQyxjQUFjSCxRQUFRQyxHQUFHLENBQUNHLHNCQUFzQjtRQUNsRDtRQUNBUCxzRUFBbUJBLENBQUM7WUFDbEJRLE1BQU07WUFDTixNQUFNQyxXQUFVQyxXQUFXLEVBQUVDLEdBQUcsRUFBRTtnQkFDaEMsTUFBTUMsT0FBTztvQkFDWEMsT0FBT0gsWUFBWUcsS0FBSztvQkFDeEJDLFVBQVVKLFlBQVlJLFFBQVE7Z0JBQ2hDO2dCQUVBLE1BQU1DLFVBQVU7b0JBQ2RDLFFBQVE7b0JBQ1JDLFNBQVM7d0JBQUUsZ0JBQWdCO29CQUFtQjtvQkFDOUNDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQ1I7Z0JBQ3ZCO2dCQUVBLG1FQUFtRTtnQkFDbkUsSUFBSVMsT0FBTyxNQUFNQyxNQUNmLDhEQUNBUCxTQUNBUSxJQUFJLENBQUMsQ0FBQ0MsTUFBUUEsSUFBSUMsSUFBSTtnQkFFeEIsSUFBSUosS0FBS0ssUUFBUSxFQUFFO29CQUNqQixrRUFBa0U7b0JBRWxFLE1BQU1DLFlBQVksTUFBTUwsTUFDdEIsNkRBQ0FQLFNBQ0FRLElBQUksQ0FBQyxDQUFDQyxNQUFRQSxJQUFJQyxJQUFJO29CQUV4QixJQUFJRSxVQUFVQyxLQUFLLEVBQUU7d0JBQ25CLE9BQU8sSUFBSTtvQkFDYixPQUFPO3dCQUNMLE9BQU9QO29CQUNULENBQUM7Z0JBQ0gsT0FBTztvQkFDTCwrRkFBK0Y7b0JBQy9GLE9BQU8sSUFBSTtnQkFDYixDQUFDO1lBQ0g7UUFDRjtLQUNEO0FBQ0gsRUFBRSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVyY3VyaXVzLy4vcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS5qcz81MjdmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCI7XHJcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIjtcclxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5leHRBdXRoKHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgIC8vIE9BdXRoIGF1dGhlbnRpY2F0aW9uIHByb3ZpZGVycy4uLlxyXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xyXG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfR09PR0xFX0lELFxyXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX0dPT0dMRV9TRUNSRVQsXHJcbiAgICB9KSxcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXHJcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscywgcmVxKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgIGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCxcclxuICAgICAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEFkZCBsb2dpYyBoZXJlIHRvIGxvb2sgdXAgdGhlIHVzZXIgZnJvbSB0aGUgY3JlZGVudGlhbHMgc3VwcGxpZWRcclxuICAgICAgICBsZXQgdXNlciA9IGF3YWl0IGZldGNoKFxyXG4gICAgICAgICAgXCJodHRwczovL21lcmN1cml1cy1iYWNrZW5kLnVwLnJhaWx3YXkuYXBwL2FwaS91c2Vycy92ZXJpZnkvXCIsXHJcbiAgICAgICAgICBvcHRpb25zXHJcbiAgICAgICAgKS50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpO1xyXG5cclxuICAgICAgICBpZiAodXNlci5mdWxsbmFtZSkge1xyXG4gICAgICAgICAgLy8gQW55IG9iamVjdCByZXR1cm5lZCB3aWxsIGJlIHNhdmVkIGluIGB1c2VyYCBwcm9wZXJ0eSBvZiB0aGUgSldUXHJcblxyXG4gICAgICAgICAgY29uc3QgbG9naW5Vc2VyID0gYXdhaXQgZmV0Y2goXHJcbiAgICAgICAgICAgIFwiaHR0cHM6Ly9tZXJjdXJpdXMtYmFja2VuZC51cC5yYWlsd2F5LmFwcC9hcGkvdXNlcnMvbG9naW4vXCIsXHJcbiAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAgICAgICkudGhlbigocmVzKSA9PiByZXMuanNvbigpKTtcclxuXHJcbiAgICAgICAgICBpZiAobG9naW5Vc2VyLmVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIElmIHlvdSByZXR1cm4gbnVsbCB0aGVuIGFuIGVycm9yIHdpbGwgYmUgZGlzcGxheWVkIGFkdmlzaW5nIHRoZSB1c2VyIHRvIGNoZWNrIHRoZWlyIGRldGFpbHMuXHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG59KTtcclxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiR29vZ2xlUHJvdmlkZXIiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfR09PR0xFX0lEIiwiY2xpZW50U2VjcmV0IiwiTkVYVEFVVEhfR09PR0xFX1NFQ1JFVCIsIm5hbWUiLCJhdXRob3JpemUiLCJjcmVkZW50aWFscyIsInJlcSIsImRhdGEiLCJlbWFpbCIsInBhc3N3b3JkIiwib3B0aW9ucyIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXIiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZnVsbG5hbWUiLCJsb2dpblVzZXIiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].js"));
module.exports = __webpack_exports__;

})();