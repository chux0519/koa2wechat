'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.handler = undefined;

var _defaultHandler = require('./defaultHandler');

var _defaultHandler2 = _interopRequireDefault(_defaultHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// return Promise
var handler = function handler(xml) {
	var MsgType = xml.MsgType;

	if (!MsgType) return;
	// more about MsgType: http://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html
	switch (MsgType) {
		// when client subscribe,case 'event' occurs
		case 'event':
		case 'text':
		case 'image':
		case 'voice':
		case 'video':
		case 'shortvideo':
		case 'location':
		case 'link':
		default:
			return (0, _defaultHandler2.default)(xml);
	}
};
exports.handler = handler;
exports.default = handler;