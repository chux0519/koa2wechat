'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var textTpl = function textTpl(msg) {
	var ToUserName = msg.to;
	var FromUserName = msg.from;
	var CreateTime = msg.ts;
	var Content = msg.content;

	if (!ToUserName || !FromUserName || !CreateTime || !Content) return '';
	var retStr = '<xml>\n<ToUserName><![CDATA[' + ToUserName + ']]></ToUserName>\n<FromUserName><![CDATA[' + FromUserName + ']]></FromUserName>\n<CreateTime>' + CreateTime + '</CreateTime>\n<MsgType><![CDATA[text]]></MsgType>\n<Content><![CDATA[' + Content + ']]></Content>\n</xml>';
	return retStr;
};

exports.default = textTpl;