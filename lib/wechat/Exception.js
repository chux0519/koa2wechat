"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExceptionHandler = ExceptionHandler;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WeException = function WeException(message) {
  _classCallCheck(this, WeException);

  this.error = true;
  this.type = "Internal Server Error";
  this.message = message;
  this.status = 500;
};

var Exception = exports.Exception = WeException;

function ExceptionHandler(exception) {
  if (exception instanceof WeException) return { ok: false, error: true, message: exception.message, status: exception.status, type: exception.type };
  throw exception;
}