'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Wechat2 = require('./Wechat');

var _Wechat3 = _interopRequireDefault(_Wechat2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _formData = require('form-data');

var _formData2 = _interopRequireDefault(_formData);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _api = require('../api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getHeaders = function getHeaders(form) {
	// axios 在node里只支持提交stream，要提交form-data必须手动设定headers
	return new Promise(function (resolve, reject) {
		form.getLength(function (err, length) {
			// 获取content-length，（微信开发文档指明这项是必须）
			if (err) reject(err);
			// 构造header
			var headers = Object.assign({ 'Content-Length': length }, form.getHeaders());
			resolve(headers);
		});
	});
};

// 素材管理类

var WechatApi = function (_Wechat) {
	_inherits(WechatApi, _Wechat);

	/**
  * [constructor 构造函数]
  * @param  {[Object]} config [同Wechat的参数]
  * @return {[class]}        [提供一些微信api操作]
  */
	function WechatApi(config) {
		_classCallCheck(this, WechatApi);

		var _this = _possibleConstructorReturn(this, (WechatApi.__proto__ || Object.getPrototypeOf(WechatApi)).call(this, config));

		_this.api = _api.api;
		console.log(_this.api);
		return _this;
	}

	/**
  * [uploadTemp 用于上传临时素材]
  * @param  {[string]} type      [媒体文件类型，分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）]
  * @param  {[string]} mediaPath [文件全路径，例如‘../../test.jpg’]
  * @return {[Promise]}           [返回一个axios Promise]
  */


	_createClass(WechatApi, [{
		key: 'uploadTemp',
		value: function uploadTemp(type, mediaPath) {
			var that = this;
			// 构建表单
			var data = _fs2.default.createReadStream(mediaPath);
			var mediaName = mediaPath.substring(mediaPath.lastIndexOf('/') + 1);
			var form = new _formData2.default();
			form.append('media', data, mediaName);
			// 获取access_token 和 headers，然后返回一个axios请求
			return Promise.all([this.getToken(), getHeaders(form)]).then(function (values) {
				var token = values[0];
				var access_token = token.access_token;
				var url = that.api.baseUrl + that.api.material.upload + 'access_token=' + access_token + '&type=' + type;
				var headers = values[1];
				return _axios2.default.post(url, form, { headers: headers });
			}).catch(function (e) {
				console.log("###error in function [uploadTemp]");
				return Promise.reject(e);
			});
		}

		/**
   * [downloadTemp 下载临时素材]
   * @param  {[string]} mediaId   [参数]
   * @param  {[string]} directory [存储素材目录]
   * @return {[promise]}           [成功将resolve已下载的素材名]
   */

	}, {
		key: 'downloadTemp',
		value: function downloadTemp(mediaId, directory) {
			var isVideo = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

			var that = this;
			if (!isVideo) {
				// 非视频文件
				return this.getToken().then(function (token) {
					var access_token = token.access_token;
					var url = that.api.baseUrl + that.api.material.download + 'access_token=' + access_token + '&media_id=' + mediaId;
					return _axios2.default.get(url, { responseType: 'stream' });
				}).then(function (response) {
					console.log("content-type: ", response.headers['content-type']);
					console.log("content-disposition: ", response.headers['content-disposition']);

					var filename = /filename="(.*?)"/.exec(response.headers['content-disposition'])[1];
					var temp = _fs2.default.createWriteStream(_path2.default.join(directory, filename));
					response.data.pipe(temp);
					return Promise.resolve(filename);
				}).catch(function (e) {
					console.log("###error in function [downloadTemp]");
					return Promise.reject(e);
				});
			} else {
				// 视频文件
				return this.getToken().then(function (token) {
					var access_token = token.access_token;
					var url = that.api.baseUrl + that.api.material.download + 'access_token=' + access_token + '&media_id=' + mediaId;
					return _axios2.default.get(url);
				}).then(function (response) {
					try {
						var url = response.data.video_url;
						console.log("now downloading video");
						return Promise.resolve(url);
					} catch (e) {
						console.log("can't get the download-url of this video");
						return Promise.reject(e);
					}
				}).then(function (downUrl) {
					return _axios2.default.get(downUrl, { responseType: 'stream' });
				}).then(function (response) {
					console.log("content-type: ", response.headers['content-type']);
					console.log("content-disposition: ", response.headers['content-disposition']);

					var filename = /filename=(.*?)$/.exec(response.headers['content-disposition'])[1];
					var temp = _fs2.default.createWriteStream(_path2.default.join(directory, filename));
					response.data.pipe(temp);
					return Promise.resolve(filename);
				}).catch(function (e) {
					console.log("###error in function [downloadTemp]");
					return Promise.reject(e);
				});
			}
		}

		/**
   * [uploadNews 上传永久素材--图文]
   * @param  {[object]} articles 详细字段参考：http://mp.weixin.qq.com/wiki/10/10ea5a44870f53d79449290dfd43d006.html
   * 例如  {
   *        "title": TITLE,
   *        "thumb_media_id": THUMB_MEDIA_ID,
   *        "author": AUTHOR,
   *        "digest": DIGEST,
   *        "show_cover_pic": SHOW_COVER_PIC(0 / 1),
   *        "content": CONTENT,
   *        "content_source_url": CONTENT_SOURCE_URL
   *      }
   * @return {[Promise]}          [axios Post]
   */

	}, {
		key: 'uploadNews',
		value: function uploadNews(articles) {
			var that = this;
			// 构建表单
			var form = { articles: articles };
			// 获取access_token，然后返回一个axios请求
			return this.getToken().then(function (token) {
				var access_token = token.access_token;
				var url = that.api.baseUrl + that.api.permanent.uploadNews + 'access_token=' + access_token;
				return _axios2.default.post(url, form);
			}).catch(function (e) {
				console.log("###error in function [uploadNews]");
				return Promise.reject(e);
			});
		}

		/**
   * [uploadPerm 上传除了图文类型的其他永久素材]
   * @param  {[string]} type      [媒体文件类型，分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）]
   * @param  {[string]} mediaPath [目标文件路径]
   * @param  {[object]} videoDesc [只有上传类型为‘video’才需要，例如：
   * {
   * 		"title":VIDEO_TITLE,
   * 		"introduction":INTRODUCTION
   * 	}					  						  
   * @return {[Promise]}           [axios POST]
   */

	}, {
		key: 'uploadPerm',
		value: function uploadPerm(type, mediaPath, videoDesc) {
			var that = this;
			// 构建表单
			var data = _fs2.default.createReadStream(mediaPath);
			var mediaName = mediaPath.substring(mediaPath.lastIndexOf('/') + 1);
			var form = new _formData2.default();
			form.append('type', type);
			form.append('media', data, mediaName);
			if (type === 'video') form.append('description', JSON.stringify(videoDesc));
			// 获取access_token 和 headers，然后返回一个axios请求
			return Promise.all([this.getToken(), getHeaders(form)]).then(function (values) {
				var token = values[0];
				var access_token = token.access_token;
				var url = that.api.baseUrl + that.api.permanent.upload + 'access_token=' + access_token;
				var headers = values[1];
				return _axios2.default.post(url, form, { headers: headers });
			}).catch(function (e) {
				console.log("###error in function [uploadPerm]");
				return Promise.reject(e);
			});
		}

		/**
   * [downloadPerm 下载永久素材]
   * @param  {[string]} type      [如果要获取图文，则填写（news），获取视频填写（video），获取图片（image）、语音（voice）和缩略图（thumb）]
   * @param  {[string]} mediaId   [media_id]
   * @param  {[存储在本地的目录]} directory [图文直接返回字符串，不会写入本地]
   * @return {[Promise]}           [获取图文最终返回json，其他多媒体类型最终返回文件名]
   */

	}, {
		key: 'downloadPerm',
		value: function downloadPerm(type, mediaId, directory) {
			var _this2 = this;

			var that = this;
			if (type === 'news') {
				var _ret = function () {
					// 图文返回json
					var form = { media_id: mediaId };
					return {
						v: _this2.getToken().then(function (token) {
							var access_token = token.access_token;
							var url = that.api.baseUrl + that.api.permanent.download + 'access_token=' + access_token;
							return _axios2.default.post(url, form);
						}).catch(function (e) {
							console.log("###error in function [downloadPerm]");
							return Promise.reject(e);
						})
					};
				}();

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			} else if (type === 'video') {
				var _ret2 = function () {
					var form = { media_id: mediaId };
					return {
						v: _this2.getToken().then(function (token) {
							var access_token = token.access_token;
							var url = that.api.baseUrl + that.api.permanent.download + 'access_token=' + access_token;
							return _axios2.default.post(url, form);
						}).then(function (response) {
							console.log(response.data);
							try {
								var url = response.data.down_url;
								console.log("now downloading video");
								return Promise.resolve(url);
							} catch (e) {
								console.log("can't get the download-url of this video");
								return Promise.reject(e);
							}
						}).then(function (downUrl) {
							return _axios2.default.get(downUrl, { responseType: 'stream' });
						}).then(function (response) {
							console.log("content-type: ", response.headers['content-type']);
							console.log("content-disposition: ", response.headers['content-disposition']);

							var filename = /filename=(.*?)$/.exec(response.headers['content-disposition'])[1];
							var temp = _fs2.default.createWriteStream(_path2.default.join(directory, filename));
							response.data.pipe(temp);
							return Promise.resolve(filename);
						}).catch(function (e) {
							console.log("###error in function [downloadPerm]");
							return Promise.reject(e);
						})
					};
				}();

				if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
			} else {
				var _ret3 = function () {
					// 其他多媒体类型直接返回文件
					var form = { media_id: mediaId };
					return {
						v: _this2.getToken().then(function (token) {
							var access_token = token.access_token;
							var url = that.api.baseUrl + that.api.permanent.download + 'access_token=' + access_token;
							// console.log(url)
							return _axios2.default.post(url, form, { responseType: 'stream' });
						}).then(function (response) {
							if (!response.headers['content-disposition']) {
								return Promise.reject("reach max api daily quota limit");
							}
							// console.log(response.headers)
							console.log("content-type: ", response.headers['content-type']);
							console.log("content-disposition: ", response.headers['content-disposition']);
							var filename = /filename="(.*?)"/.exec(response.headers['content-disposition'])[1];
							if (!filename) return Promise.reject('nofile returned,response headers: ', response.headers);
							var temp = _fs2.default.createWriteStream(_path2.default.join(directory, filename));
							response.data.pipe(temp);
							return Promise.resolve("downloaded : ", filename);
						}).catch(function (e) {
							console.log("###error in function [downloadPerm]");
							return Promise.reject(e);
						})
					};
				}();

				if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
			}
		}

		/**
   * [removePerm 删除永久素材]
   * @param  {[string]} mediaId [media_id]
   * @return {[Promise]}         [最终返回json{status:true,item:form}，status代表是否删除成功。item为post的内容，如果不成功可以缓存下来]
   */

	}, {
		key: 'removePerm',
		value: function removePerm(mediaId) {
			var that = this;
			var form = {
				"media_id": mediaId
			};
			return this.getToken().then(function (token) {
				var access_token = token.access_token;
				var url = that.api.baseUrl + that.api.permanent.remove + 'access_token=' + access_token;
				return _axios2.default.post(url, form);
			}).then(function (response) {
				if (response.data.errcode == 0) return Promise.resolve({ status: true, item: form });else return Promise.resolve({ status: false, item: form });
			}).catch(function (e) {
				console.log(e);
			});
		}

		/**
   * [updateNews 更新永久图文素材] 具体参数意义请参考：http://mp.weixin.qq.com/wiki/10/c7bad9a463db20ff8ccefeedeef51f9e.html
   * @param  {[string]} mediaId [media_id]
   * @param  {[int]} index   [index]
   * @param  {[object]} article [article]
   * @return {[type]}         [最终返回json{status:true,item:form}，status代表是否删除成功。item为post的内容，如果不成功可以缓存下来]
   */

	}, {
		key: 'updateNews',
		value: function updateNews(mediaId, index, article) {
			var that = this;
			// 构建表单
			var form = {
				media_id: mediaId,
				index: index,
				articles: article
			};
			// 获取access_token，然后返回一个axios请求
			return this.getToken().then(function (token) {
				var access_token = token.access_token;
				var url = that.api.baseUrl + that.api.permanent.updateNews + 'access_token=' + access_token;
				return _axios2.default.post(url, form);
			}).then(function (response) {
				if (response.data.errcode == 0) return Promise.resolve({ status: true, item: form });else return Promise.resolve({ status: false, item: form });
			}).catch(function (e) {
				console.log(e);
			});
		}

		/**
   * [getPermCount 获取永久素材类型和个数]
   * @return {[Promise]} 最终返回json，形如
   * {
   *	  "voice_count":COUNT,
   *	  "video_count":COUNT,
   *	  "image_count":COUNT,
   *	  "news_count":COUNT
   * }
   */

	}, {
		key: 'getPermCount',
		value: function getPermCount() {
			var that = this;
			return this.getToken().then(function (token) {
				var access_token = token.access_token;
				var url = that.api.baseUrl + that.api.permanent.getCount + 'access_token=' + access_token;
				return _axios2.default.get(url);
			}).catch(function (e) {
				console.log(e);
			});
		}

		/**
   * [batchGetPerm 批量获取某类型的永久素材信息]
   * @param  {[string]} type   [素材的类型，图片（image）、视频（video）、语音 （voice）、图文（news）]
   * @param  {[int]} offset [从全部素材的该偏移位置开始返回，0表示从第一个素材 返回]
   * @param  {[int]} count  [返回素材的数量，取值在1到20之间]
   * @return {[Promise]}        [最终返回参数请参考：http://mp.weixin.qq.com/wiki/15/8386c11b7bc4cdd1499c572bfe2e95b3.html]
   */

	}, {
		key: 'batchGetPerm',
		value: function batchGetPerm(type, offset, count) {
			var that = this;
			var form = {
				"type": type,
				"offset": offset,
				"count": count
			};
			return this.getToken().then(function (token) {
				var access_token = token.access_token;
				var url = that.api.baseUrl + that.api.permanent.batchGet + 'access_token=' + access_token;
				return _axios2.default.post(url, form);
			}).catch(function (e) {
				console.log(e);
			});
		}
	}]);

	return WechatApi;
}(_Wechat3.default);

exports.default = WechatApi;