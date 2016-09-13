'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var msgParser = function msgParser(xmlStr) {
	return new Promise(function (resolve, reject) {
		_xml2js2.default.parseString(xmlStr, function (err, result) {
			if (err) reject(err);
			resolve(result);
		});
	});
};

exports.default = msgParser;