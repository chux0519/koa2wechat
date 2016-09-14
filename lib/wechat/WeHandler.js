"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WeHandler = undefined;

var _handler = require("../handler/handler");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var WeHandler = function WeHandler(handler) {
	return function () {
		var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
			var xml, res;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!ctx.wechat.req) console.log("no request from client");
							xml = ctx.wechat.req;

							if (!handler) handler = _handler.handler;

							_context.next = 5;
							return handler(xml);

						case 5:
							res = _context.sent;

							ctx.wechat.res = res;

							_context.next = 9;
							return next();

						case 9:
						case "end":
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