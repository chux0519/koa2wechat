"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var imageTpl = function imageTpl(msg) {
	var ToUserName = msg.ToUserName;
	var FromUserName = msg.FromUserName;
	var CreateTime = msg.CreateTime;
	var MediaId = msg.MediaId;

	var retStr = "<xml>\n\t<ToUserName><![CDATA[" + ToUserName + "]]></ToUserName>\n\t<FromUserName><![CDATA[" + FromUserName + "]]></FromUserName>\n\t<CreateTime>" + CreateTime + "</CreateTime>\n\t<MsgType><![CDATA[image]]></MsgType>\n\t<Image>\n\t<MediaId><![CDATA[" + MediaId + "]]></MediaId>\n\t</Image>\n\t</xml>";
	return retStr;
};

exports.default = imageTpl;