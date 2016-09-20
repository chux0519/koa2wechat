"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.ExceptionHandler = ExceptionHandler;

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTTPException = function () {
  function HTTPException(type) {
    _classCallCheck(this, HTTPException);

    this.error = true;
  }

  _createClass(HTTPException, [{
    key: "status",
    get: function get() {
      return this._status;
    },
    set: function set(status) {
      this._status = status;
    }
  }, {
    key: "message",
    get: function get() {
      return this._message;
    },
    set: function set(message) {
      this._message = message;
    }
  }]);

  return HTTPException;
}();

var Unauthorized = function (_HTTPException) {
  _inherits(Unauthorized, _HTTPException);

  function Unauthorized(message) {
    _classCallCheck(this, Unauthorized);

    var _this = _possibleConstructorReturn(this, (Unauthorized.__proto__ || Object.getPrototypeOf(Unauthorized)).call(this));

    _this.type = "Unauthorized";
    _this.message = message;
    _this.status = 401;
    return _this;
  }

  return Unauthorized;
}(HTTPException);

var ImplementError = function (_HTTPException2) {
  _inherits(ImplementError, _HTTPException2);

  function ImplementError(message) {
    _classCallCheck(this, ImplementError);

    var _this2 = _possibleConstructorReturn(this, (ImplementError.__proto__ || Object.getPrototypeOf(ImplementError)).call(this));

    _this2.type = "Not implemented";
    _this2.message = message;
    _this2.status = 501;
    return _this2;
  }

  return ImplementError;
}(HTTPException);

var Exceptions = exports.Exceptions = {
  Unauthorized: Unauthorized,
  ImplementError: ImplementError
};

function ExceptionHandler(exception) {
  if (exception instanceof HTTPException) return { ok: false, error: true, message: exception.message, status: exception.status, type: exception.type };
  throw exception;
}