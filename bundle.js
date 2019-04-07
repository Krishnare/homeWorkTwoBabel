"use strict";

var _fetchData = _interopRequireDefault(require("../js/fetchData.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

"use strict";

var apiKey = "720c0314e8b2423eb7e1ffca5a1eeeb1";
var newsCategory = "bbc-news";
var url = "https://newsapi.org/v1/articles?source=".concat(newsCategory, "&apiKey=").concat(apiKey); //OnChange load

var sourceSelectBox = document.getElementById("newsSource");
sourceSelectBox.addEventListener("change", function (event) {
  newsCategory = event.target.value;
  url = "https://newsapi.org/v1/articles?source=".concat(newsCategory, "&apiKey=").concat(apiKey);

  _fetchData["default"].getRequest(url);
}); //onload selectBox

var sourceUrl = "https://newsapi.org/v2/sources?apiKey=720c0314e8b2423eb7e1ffca5a1eeeb1";

_fetchData["default"].apiSourceFetcher(sourceUrl);

_fetchData["default"].getRequest(url);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RequestService =
/*#__PURE__*/
function () {
  function RequestService() {
    _classCallCheck(this, RequestService);
  }

  _createClass(RequestService, [{
    key: "getRequest",
    value: function () {
      var _getRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(url) {
        var newsData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(url).then(function (data) {
                  return data.json();
                })["catch"](function (err) {
                  return newsSource.articlesProvider(err);
                });

              case 2:
                newsData = _context.sent;
                newsSource.articlesProvider(newsData);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getRequest(_x) {
        return _getRequest.apply(this, arguments);
      }

      return getRequest;
    }()
  }, {
    key: "apiSourceFetcher",
    value: function () {
      var _apiSourceFetcher = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(url) {
        var newsSourceSelect;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch(url).then(function (source) {
                  return source.json();
                })["catch"](function (error) {
                  return newsSource.newsSourceChannel(error);
                });

              case 2:
                newsSourceSelect = _context2.sent;
                newsSource.newsSourceChannel(newsSourceSelect.sources);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function apiSourceFetcher(_x2) {
        return _apiSourceFetcher.apply(this, arguments);
      }

      return apiSourceFetcher;
    }()
  }]);

  return RequestService;
}();

var newsSourceProvider =
/*#__PURE__*/
function (_RequestService) {
  _inherits(newsSourceProvider, _RequestService);

  function newsSourceProvider() {
    _classCallCheck(this, newsSourceProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(newsSourceProvider).apply(this, arguments));
  }

  _createClass(newsSourceProvider, [{
    key: "articlesProvider",
    value: function articlesProvider(data) {
      var elementId = document.getElementById("newsDetails");
      var returnHtml = "",
          uniqueVal = [];

      if (data.status === "error") {
        returnHtml = "<div id=\"error\">".concat(data.message, "</div>");
      } else {
        data.articles.map(function (_ref, index) {
          var author = _ref.author,
              title = _ref.title,
              description = _ref.description,
              publishedAt = _ref.publishedAt,
              url = _ref.url,
              urlToImage = _ref.urlToImage;
          uniqueVal = index === 0 ? "<h1>".concat(author, "</h1>") : "";
          returnHtml += "".concat(uniqueVal, "<div class=\"newsTitle\">").concat(title, "</div><div class=\"newsDescription\">").concat(description, "</div><div class=\"publishDate\">").concat(publishedAt, "</div><div class=\"imageContainer\"><a href=\"").concat(url, "\" target=\"_blank\"><img src=").concat(urlToImage, " /></a></div>");
        });
      }

      elementId.innerHTML = returnHtml;
    }
  }, {
    key: "newsSourceChannel",
    value: function newsSourceChannel(data) {
      var sourceSelectBox = document.getElementById("newsSource");
      data.map(function (_ref2, index) {
        var id = _ref2.id;
        var selectOptions = document.createElement("option");
        selectOptions[index] += selectOptions.text = id;
        sourceSelectBox.appendChild(selectOptions);
      });
    }
  }]);

  return newsSourceProvider;
}(RequestService);

var requestCall = new RequestService();
var newsSource = new newsSourceProvider();
var _default = requestCall;
exports["default"] = _default;
"use strict";
