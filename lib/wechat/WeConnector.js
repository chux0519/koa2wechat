'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sha = require('sha1');

var _sha2 = _interopRequireDefault(_sha);

var _rawBody = require('raw-body');

var _rawBody2 = _interopRequireDefault(_rawBody);

var _parser = require('../xml/parser');

var _parser2 = _interopRequireDefault(_parser);

var _formatter = require('../xml/formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _Exception = require('./Exception');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

/**
 * middle ware
 * @param  {String} token [notice this token is for encrypt not access_token]
 * @return {async fn}       [middle ware]
 */
var WeConnector = function WeConnector(token) {
	// return a middleware async fn
	return function () {
		var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
			var _token, _ctx$query, signature, timestamp, nonce, echostr, sha, rawData, xmlData, xml;

			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							_token = _token;
							_ctx$query = ctx.query;
							signature = _ctx$query.signature;
							timestamp = _ctx$query.timestamp;
							nonce = _ctx$query.nonce;
							echostr = _ctx$query.echostr;

							if (!(!signature || !timestamp || !nonce)) {
								_context.next = 10;
								break;
							}

							// not from wechat
							ctx.body = "wrong place";
							return _context.abrupt('return');

						case 10:
							sha = (0, _sha2.default)([_token, timestamp, nonce].sort().join(''));

							// get for wechat server test

							if (!(ctx.method === 'GET')) {
								_context.next = 15;
								break;
							}

							if (sha === signature) {
								ctx.body = echostr;
							} else {
								ctx.body = "encrypt wrong!";
							}
							_context.next = 36;
							break;

						case 15:
							if (!(ctx.method === 'POST')) {
								_context.next = 36;
								break;
							}

							if (!(sha !== signature)) {
								_context.next = 19;
								break;
							}

							ctx.body = 'wrong place';
							return _context.abrupt('return');

						case 19:
							_context.next = 21;
							return (0, _rawBody2.default)(ctx.req, {
								length: ctx.length,
								limit: '1mb',
								encoding: ctx.charset
							});

						case 21:
							rawData = _context.sent;
							_context.next = 24;
							return (0, _parser2.default)(rawData);

						case 24:
							xmlData = _context.sent;


							// format xml
							xml = (0, _formatter2.default)(xmlData.xml);

							console.info("xml obj : ", xml);

							ctx.wechat = {};
							ctx.wechat.req = xml;

							// handle the request
							_context.next = 31;
							return next();

						case 31:
							if (ctx.wechat.res) {
								_context.next = 33;
								break;
							}

							throw new _Exception.Exception('Can\'t handle the request ' + ctx.wechat.req);

						case 33:

							// reply xml
							ctx.status = 200;
							ctx.type = 'application/xml';
							ctx.body = ctx.wechat.res;

						case 36:
							_context.next = 41;
							break;

						case 38:
							_context.prev = 38;
							_context.t0 = _context['catch'](0);

							ctx.body = (0, _Exception.ExceptionHandler)(_context.t0);

						case 41:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined, [[0, 38]]);
		}));

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}();
};

exports.default = WeConnector;