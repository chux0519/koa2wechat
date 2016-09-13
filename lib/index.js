'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.wTpls = exports.wLoader = exports.Wechat = undefined;

var _Loader = require('./wechat/Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _Wechat = require('./wechat/Wechat');

var _Wechat2 = _interopRequireDefault(_Wechat);

var _templates = require('./xml/templates');

var _templates2 = _interopRequireDefault(_templates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Wechat = _Wechat2.default;
exports.wLoader = _Loader2.default;
exports.wTpls = _templates2.default;
exports.default = {
	Wechat: _Wechat2.default,
	wLoader: _Loader2.default,
	wTpls: _templates2.default
};