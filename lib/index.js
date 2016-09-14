'use strict';
require('babel-polyfill');
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ReplyBuilder = exports.wLoader = exports.Wechat = undefined;

var _Loader = require('./wechat/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _Wechat = require('./wechat/Wechat');

var _Wechat2 = _interopRequireDefault(_Wechat);

var _Reply = require('./wechat/Reply');

var _Reply2 = _interopRequireDefault(_Reply);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Wechat = _Wechat2.default;
exports.wLoader = _Loader2.default;
exports.ReplyBuilder = _Reply2.default;
exports.default = {
	Wechat: _Wechat2.default,
	wLoader: _Loader2.default,
	ReplyBuilder: _Reply2.default
};