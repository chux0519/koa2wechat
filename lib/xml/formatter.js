'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formater = function formater(xmlObj) {
	var ret = {};
	var props = Object.keys(xmlObj);
	props.map(function (prop) {
		var flattened = _lodash2.default.flattenDeep(xmlObj[prop]);
		if (flattened.length === 0) ret[prop] = '';else if (flattened.length === 1) ret[prop] = flattened[0];else ret[prop] = flattened;
	});
	return ret;
};

exports.default = formater;