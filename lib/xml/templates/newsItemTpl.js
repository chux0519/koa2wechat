"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var newsItemTpl = function newsItemTpl(article) {
	var _article$title = article.title;
	var title = _article$title === undefined ? "default title" : _article$title;
	var _article$desc = article.desc;
	var desc = _article$desc === undefined ? "default description" : _article$desc;
	var _article$picUrl = article.picUrl;
	var picUrl = _article$picUrl === undefined ? "default pic url" : _article$picUrl;
	var _article$url = article.url;
	var url = _article$url === undefined ? "default origin url" : _article$url;

	var ret = '';
	ret = "<item>\n<Title><![CDATA[" + title + "]]></Title>\n<Description><![CDATA[" + desc + "]]></Description>\n<PicUrl><![CDATA[" + picUrl + "]]></PicUrl>\n<Url><![CDATA[" + url + "]]></Url>\n</item>";
	return ret;
};

exports.default = newsItemTpl;