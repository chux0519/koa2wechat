'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var readFile = function readFile(path) {
	return new Promise(function (resolve, reject) {
		_fs2.default.readFile(path, 'utf8', function (err, data) {
			if (err) reject(err);
			resolve(data);
		});
	});
};

var writeFile = function writeFile(token, path) {
	return new Promise(function (resolve, reject) {
		_fs2.default.writeFile(path, token, function (err) {
			if (err) reject(err);else {
				console.log("saved new token:", token);
				resolve(token);
			}
		});
	});
};

var Wechat = function () {
	function Wechat(config) {
		_classCallCheck(this, Wechat);

		this.appid = config.appid;
		this.secret = config.secret;
		this.localTokenPath = config.local_token_path;
		this.baseUrl = 'https://api.weixin.qq.com/cgi-bin/';
		this.tokenUrl = this.baseUrl + ('token?grant_type=client_credential&appid=' + config.appid + '&secret=' + config.secret);
		this.getToken().then(function (token) {
			return console.log("ok");
		});
	}

	_createClass(Wechat, [{
		key: 'isValidToken',
		value: function isValidToken(token) {
			if (!token || !token.access_token || !token.expires_in) return false;
			var now = new Date().getTime();
			if (now < token.expires_in) return true;
			return false;
		}

		// return a Promise
		// resolve token{Obj}

	}, {
		key: 'getToken',
		value: function getToken() {
			var that = this;
			// token is in the Instace allready
			if (this.token) {
				if (this.isValidToken(this.token)) {
					return Promise.resolve(this.token);
				}
			}
			// getLocalToken
			return readFile(this.localTokenPath).then(function (localTokenStr) {
				var localToken = JSON.parse(localTokenStr);
				console.log("local token", localToken);
				if (that.isValidToken(localToken)) {
					return Promise.resolve(localToken);
				} else {
					return that.getRemoteToken(that.tokenUrl);
				}
			}).then(function (token) {
				that.token = token;
				var tokenStr = JSON.stringify(token);
				return writeFile(tokenStr, that.localTokenPath);
			}).catch(function (err) {
				console.log(err);
			});
		}
	}, {
		key: 'getRemoteToken',
		value: function getRemoteToken(url) {
			return new Promise(function (resolve, reject) {
				_axios2.default.get(url).then(function (response) {
					var token = response.data;
					var now = new Date().getTime();
					// minus 30s delay
					token.expires_in = now + (token.expires_in - 30) * 1000;
					console.log("returned from remote:", token);
					resolve(token);
				}).catch(function (err) {
					console.log(err);
					reject(err);
				});
			});
		}
	}]);

	return Wechat;
}();

exports.default = Wechat;