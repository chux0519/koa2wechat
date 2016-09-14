'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.k2w = exports.WeReply = exports.WeHandler = exports.WeConnector = exports.Wechat = undefined;

require('babel-polyfill');

var _WeConnector = require('./wechat/WeConnector');

var _WeConnector2 = _interopRequireDefault(_WeConnector);

var _Wechat = require('./wechat/Wechat');

var _Wechat2 = _interopRequireDefault(_Wechat);

var _WeReply = require('./wechat/WeReply');

var _WeReply2 = _interopRequireDefault(_WeReply);

var _WeHandler = require('./wechat/WeHandler');

var _WeHandler2 = _interopRequireDefault(_WeHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Wechat = _Wechat2.default;
exports.WeConnector = _WeConnector2.default;
exports.WeHandler = _WeHandler2.default;
exports.WeReply = _WeReply2.default;
var k2w = exports.k2w = {
	Wechat: _Wechat2.default,
	WeConnector: _WeConnector2.default,
	WeHandler: _WeHandler2.default,
	WeReply: _WeReply2.default
};