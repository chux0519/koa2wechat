"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var videoTpl = function videoTpl(msg) {
	var ToUserName = msg.ToUserName;
	var FromUserName = msg.FromUserName;
	var CreateTime = msg.CreateTime;
	var MediaId = msg.MediaId;
	var Title = msg.Title;
	var Description = msg.Description;

	var retStr = "<xml>\n\t<ToUserName><![CDATA[" + ToUserName + "]]></ToUserName>\n\t<FromUserName><![CDATA[" + FromUserName + "]]></FromUserName>\n\t<CreateTime>" + CreateTime + "</CreateTime>\n\t<MsgType><![CDATA[video]]></MsgType>\n\t<Video>\n\t<MediaId><![CDATA[" + MediaId + "]]></MediaId>\n\t<Title><![CDATA[" + Title + "]]></Title>\n\t<Description><![CDATA[" + Description + "]]></Description>\n\t</Video> \n\t</xml>";
	return retStr;
};

exports.default = videoTpl;