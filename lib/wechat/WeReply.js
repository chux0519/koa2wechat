'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templates = require('../xml/templates');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var welcomeStr = 'hello from koa2wechat!';

var WeReply = function () {

	/**
  * [constructor]
  * @param  {obj} rplObj must have `meta` and `type` property,for example:
  *      rplObj = {
  *       			meta:{from:"",to:"",ts:new Date().getTime()},//must have `from`,`to`,property
  *       			type:"text",//can be text/image/voice/video/music/news
  *       			${key}:${value}//key and value depends on type,see wiki
  *        			}
  * 
  * @return {String}        [xml string]
  */
	function WeReply(rplObj) {
		_classCallCheck(this, WeReply);

		this.rplXml = {};
		this.ret = {};
		if (rplObj) this.init(rplObj);
	}

	_createClass(WeReply, [{
		key: 'genXML',
		value: function genXML(rplObj) {
			this.init(rplObj);
			return this.getRes();
		}
	}, {
		key: 'init',
		value: function init(rplObj) {
			this.rplXml = {};
			this.ret = {};
			if (!this.getMeta(rplObj)) {
				console.log("error!please correct the meta data");
				return '';
			}
			if (!rplObj.type) console.log("type is undefined in : ", rplObj);
			var type = rplObj.type;
			this.rplXml.type = type;
			switch (type) {
				case 'text':
					this._initText(rplObj);
					break;
				case 'image':
					this._initImage(rplObj);
					break;
				case 'voice':
					this._initVoice(rplObj);
					break;
				case 'video':
					this._initVideo(rplObj);
					break;
				case 'music':
					this._initMusic(rplObj);
					break;
				case 'news':
					this._initNews(rplObj);
					break;
				default:
					{
						console.log('type : ' + type + ' is not supported,return default xml');
						this._initText({ type: 'text', content: welcomeStr });
					}
			}
		}
	}, {
		key: 'getRes',
		value: function getRes() {
			return this.ret;
		}
	}, {
		key: 'getMeta',
		value: function getMeta(rplObj) {
			var meta = rplObj.meta;

			if (!meta.hasOwnProperty('from') || !meta.hasOwnProperty('to')) return false;
			this.rplXml.from = meta.from;
			this.rplXml.to = meta.to;
			this.rplXml.ts = meta.ts || new Date().getTime();
			return true;
		}
	}, {
		key: '_initText',
		value: function _initText(rplObj) {
			if (!rplObj.content || typeof rplObj.content !== 'string') this.rplXml.content = welcomeStr;
			this.rplXml.content = rplObj.content;
			this.ret = (0, _templates.textTpl)(this.rplXml);
		}
	}, {
		key: '_initImage',
		value: function _initImage(rplObj) {
			if (!rplObj.mediaId) {
				console.log("can't find `mediaId` in : ", rplObj);
				return '';
			}
			this.rplXml.mediaId = rplObj.mediaId;
			this.ret = (0, _templates.imageTpl)(this.rplXml);
		}
	}, {
		key: '_initVoice',
		value: function _initVoice(rplObj) {
			if (!rplObj.mediaId) {
				console.log("can't find `mediaId` in : ", rplObj);
				return '';
			}
			this.rplXml.mediaId = rplObj.mediaId;
			this.ret = (0, _templates.voiceTpl)(this.rplXml);
		}
	}, {
		key: '_initVideo',
		value: function _initVideo(rplObj) {
			if (!rplObj.mediaId) {
				console.log("can't find `mediaId` in : ", rplObj);
				return '';
			}
			var mediaId = rplObj.mediaId;
			var _rplObj$title = rplObj.title;
			var title = _rplObj$title === undefined ? "no title" : _rplObj$title;
			var _rplObj$desc = rplObj.desc;
			var desc = _rplObj$desc === undefined ? "no description" : _rplObj$desc;

			this.rplXml.mediaId = mediaId;
			this.rplXml.title = title;
			this.rplXml.desc = desc;
			this.ret = (0, _templates.videoTpl)(this.rplXml);
		}
	}, {
		key: '_initMusic',
		value: function _initMusic(rplObj) {
			var _rplObj$title2 = rplObj.title;
			var title = _rplObj$title2 === undefined ? "music title" : _rplObj$title2;
			var _rplObj$desc2 = rplObj.desc;
			var desc = _rplObj$desc2 === undefined ? "music description" : _rplObj$desc2;
			var _rplObj$musicUrl = rplObj.musicUrl;
			var musicUrl = _rplObj$musicUrl === undefined ? "muscic url" : _rplObj$musicUrl;
			var _rplObj$HQUrl = rplObj.HQUrl;
			var HQUrl = _rplObj$HQUrl === undefined ? "HQ music url" : _rplObj$HQUrl;
			var _rplObj$thumb = rplObj.thumb;
			var thumb = _rplObj$thumb === undefined ? "thumb mediaId" : _rplObj$thumb;

			this.rplXml.title = title;
			this.rplXml.desc = desc;
			this.rplXml.musicUrl = musicUrl;
			this.rplXml.HQUrl = HQUrl;
			this.rplXml.thumb = thumb;
			this.ret = (0, _templates.musicTpl)(this.rplXml);
		}
	}, {
		key: '_initNews',
		value: function _initNews(rplObj) {
			var _rplObj$articles = rplObj.articles;
			var articles = _rplObj$articles === undefined ? [{}] : _rplObj$articles;

			this.rplXml.articles = articles;
			this.ret = (0, _templates.newsTpl)(this.rplXml);
		}
	}]);

	return WeReply;
}();

exports.default = WeReply;