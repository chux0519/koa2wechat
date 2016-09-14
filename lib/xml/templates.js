'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.newsItemTpl = exports.newsTpl = exports.musicTpl = exports.voiceTpl = exports.imageTpl = exports.videoTpl = exports.textTpl = undefined;

var _textTpl = require('./templates/textTpl');

var _textTpl2 = _interopRequireDefault(_textTpl);

var _videoTpl = require('./templates/videoTpl');

var _videoTpl2 = _interopRequireDefault(_videoTpl);

var _imageTpl = require('./templates/imageTpl');

var _imageTpl2 = _interopRequireDefault(_imageTpl);

var _voiceTpl = require('./templates/voiceTpl');

var _voiceTpl2 = _interopRequireDefault(_voiceTpl);

var _musicTpl = require('./templates/musicTpl');

var _musicTpl2 = _interopRequireDefault(_musicTpl);

var _newsTpl = require('./templates/newsTpl');

var _newsTpl2 = _interopRequireDefault(_newsTpl);

var _newsItemTpl = require('./templates/newsItemTpl');

var _newsItemTpl2 = _interopRequireDefault(_newsItemTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wTpls = {
	textTpl: _textTpl2.default,
	videoTpl: _videoTpl2.default,
	imageTpl: _imageTpl2.default,
	voiceTpl: _voiceTpl2.default,
	musicTpl: _musicTpl2.default,
	newsTpl: _newsTpl2.default,
	newsItemTpl: _newsItemTpl2.default
};

exports.textTpl = _textTpl2.default;
exports.videoTpl = _videoTpl2.default;
exports.imageTpl = _imageTpl2.default;
exports.voiceTpl = _voiceTpl2.default;
exports.musicTpl = _musicTpl2.default;
exports.newsTpl = _newsTpl2.default;
exports.newsItemTpl = _newsItemTpl2.default;
exports.default = wTpls;