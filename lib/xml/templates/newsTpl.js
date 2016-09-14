"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _newsItemTpl = require("./newsItemTpl");

var _newsItemTpl2 = _interopRequireDefault(_newsItemTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newsTpl = function newsTpl(msg) {
	var ToUserName = msg.to;
	var FromUserName = msg.from;
	var CreateTime = msg.ts;
	var articles = msg.articles;
	// get head

	var head = "<xml>\n<ToUserName><![CDATA[" + ToUserName + "]]></ToUserName>\n<FromUserName><![CDATA[" + FromUserName + "]]></FromUserName>\n<CreateTime>" + CreateTime + "</CreateTime>\n<MsgType><![CDATA[news]]></MsgType>\n<ArticleCount>" + articles.length + "</ArticleCount>\n<Articles>";

	// get body
	var items = [];
	articles.forEach(function (article) {
		var _article$title = article.title;
		var title = _article$title === undefined ? "" : _article$title;
		var _article$desc = article.desc;
		var desc = _article$desc === undefined ? "" : _article$desc;
		var _article$picUrl = article.picUrl;
		var picUrl = _article$picUrl === undefined ? "" : _article$picUrl;
		var _article$url = article.url;
		var url = _article$url === undefined ? "" : _article$url;

		items.push((0, _newsItemTpl2.default)(article));
	});
	var body = items.join('\n');

	// get foot
	var foot = "</Articles>\n</xml>";
	return [head, body, foot].join('\n');
};

exports.default = newsTpl;