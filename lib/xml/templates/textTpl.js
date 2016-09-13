"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var textTpl = function textTpl(msg) {
	var ToUserName = msg.ToUserName;
	var FromUserName = msg.FromUserName;
	var CreateTime = msg.CreateTime;
	var Content = msg.Content;

	var retStr = "<xml>\n\t<ToUserName><![CDATA[" + ToUserName + "]]></ToUserName>\n\t<FromUserName><![CDATA[" + FromUserName + "]]></FromUserName>\n\t<CreateTime>" + CreateTime + "</CreateTime>\n\t<MsgType><![CDATA[text]]></MsgType>\n\t<Content><![CDATA[" + Content + "]]></Content>\n\t</xml>";
	return retStr;
};

exports.default = textTpl;