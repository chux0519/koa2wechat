"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var imageTpl = function imageTpl(msg) {
	var ToUserName = msg.to;
	var FromUserName = msg.from;
	var CreateTime = msg.ts;
	var MediaId = msg.mediaId;

	var retStr = "<xml>\n<ToUserName><![CDATA[" + ToUserName + "]]></ToUserName>\n<FromUserName><![CDATA[" + FromUserName + "]]></FromUserName>\n<CreateTime>" + CreateTime + "</CreateTime>\n<MsgType><![CDATA[image]]></MsgType>\n<Image>\n<MediaId><![CDATA[" + MediaId + "]]></MediaId>\n</Image>\n</xml>";
	return retStr;
};

exports.default = imageTpl;