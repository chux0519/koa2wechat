'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Wechat = require('./Wechat');

var _Wechat2 = _interopRequireDefault(_Wechat);

var _sha = require('sha1');

var _sha2 = _interopRequireDefault(_sha);

var _rawBody = require('raw-body');

var _rawBody2 = _interopRequireDefault(_rawBody);

var _parser = require('../xml/parser');

var _parser2 = _interopRequireDefault(_parser);

var _formatter = require('../xml/formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _handler = require('../handler/handler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var wLoader = function wLoader(config, handler) {
	// instance of Wechat
	var wechat = new _Wechat2.default(config);

	// return a middleware async fn
	return function () {
		var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
			var token, _ctx$query, signature, timestamp, nonce, echostr, sha, rawData, xmlData, xml, replyXML;

			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:

							// notice this token is for encrypt not access_token
							token = 'chuxdesign';
							_ctx$query = ctx.query;
							signature = _ctx$query.signature;
							timestamp = _ctx$query.timestamp;
							nonce = _ctx$query.nonce;
							echostr = _ctx$query.echostr;

							if (!(!signature || !timestamp || !nonce)) {
								_context.next = 9;
								break;
							}

							// not from wechat
							ctx.body = "wrong place";
							return _context.abrupt('return');

						case 9:
							sha = (0, _sha2.default)([token, timestamp, nonce].sort().join(''));

							// get for wechat server test

							if (!(ctx.method === 'GET')) {
								_context.next = 14;
								break;
							}

							if (sha === signature) {
								ctx.body = echostr;
							} else {
								ctx.body = "encrypt wrong!";
							}
							_context.next = 33;
							break;

						case 14:
							if (!(ctx.method === 'POST')) {
								_context.next = 33;
								break;
							}

							if (!(sha !== signature)) {
								_context.next = 18;
								break;
							}

							ctx.body = 'wrong place';
							return _context.abrupt('return');

						case 18:
							_context.next = 20;
							return (0, _rawBody2.default)(ctx.req, {
								length: ctx.length,
								limit: '1mb',
								encoding: ctx.charset
							});

						case 20:
							rawData = _context.sent;
							_context.next = 23;
							return (0, _parser2.default)(rawData);

						case 23:
							xmlData = _context.sent;


							// format xml
							xml = (0, _formatter2.default)(xmlData.xml);

							console.info("xml obj : ", xml);

							// set defaulthandler
							if (!handler) handler = _handler.handler;

							// handle the request
							_context.next = 29;
							return handler(xml);

						case 29:
							replyXML = _context.sent;


							// reply xml
							ctx.status = 200;
							ctx.type = 'application/xml';
							ctx.body = replyXML;

						case 33:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined);
		}));

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}();
};

exports.default = wLoader;