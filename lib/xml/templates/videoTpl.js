"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var videoTpl = function videoTpl(msg) {
	var ToUserName = msg.to;
	var FromUserName = msg.from;
	var CreateTime = msg.ts;
	var MediaId = msg.mediaId;
	var Title = msg.title;
	var Description = msg.desc;

	var retStr = "<xml>\n\t<ToUserName><![CDATA[" + ToUserName + "]]></ToUserName>\n\t<FromUserName><![CDATA[" + FromUserName + "]]></FromUserName>\n\t<CreateTime>" + CreateTime + "</CreateTime>\n\t<MsgType><![CDATA[video]]></MsgType>\n\t<Video>\n\t<MediaId><![CDATA[" + MediaId + "]]></MediaId>\n\t<Title><![CDATA[" + Title + "]]></Title>\n\t<Description><![CDATA[" + Description + "]]></Description>\n\t</Video> \n\t</xml>";
	return retStr;
};

exports.default = videoTpl;