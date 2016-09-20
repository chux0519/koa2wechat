'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WeHandler = undefined;

var _handler = require('../handler/handler');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var WeHandler = function WeHandler(handler) {
	return function () {
		var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
			var xml, res;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (ctx.wechat.req) {
								_context.next = 4;
								break;
							}

							return _context.abrupt('return');

						case 4:
							// 获取客户端推来的xml请求
							xml = ctx.wechat.req;
							// 设置默认的handler

							if (!handler) handler = _handler.handler;
							// 处理请求
							_context.next = 8;
							return handler(xml);

						case 8:
							res = _context.sent;

							// 将处理结果挂载到ctx.wechat.res
							ctx.wechat.res = res;

						case 10:
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
exports.WeHandler = WeHandler;
exports.default = WeHandler;