"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var musicTpl = function musicTpl(msg) {
	var ToUserName = msg.to;
	var FromUserName = msg.from;
	var CreateTime = msg.ts;
	var MediaId = msg.mediaId;
	var Title = msg.title;
	var Description = msg.desc;
	var MusicUrl = msg.musicUrl;
	var HQMusicUrl = msg.HQUrl;
	var ThumbMediaId = msg.thumb;

	var retStr = "<xml>\n<ToUserName><![CDATA[" + ToUserName + "]]></ToUserName>\n<FromUserName><![CDATA[" + FromUserName + "]]></FromUserName>\n<CreateTime>" + CreateTime + "</CreateTime>\n<MsgType><![CDATA[music]]></MsgType>\n<Music>\n<Title><![CDATA[" + Title + "]]></Title>\n<Description><![CDATA[" + Description + "]]></Description>\n<MusicUrl><![CDATA[" + MusicUrl + "]]></MusicUrl>\n<HQMusicUrl><![CDATA[" + HQMusicUrl + "]]></HQMusicUrl>\n<ThumbMediaId><![CDATA[" + ThumbMediaId + "]]></ThumbMediaId>\n</Music>\n</xml>";
	return retStr;
};

exports.default = musicTpl;