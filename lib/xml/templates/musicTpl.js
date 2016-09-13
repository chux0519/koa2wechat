"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var musicTpl = function musicTpl(msg) {
	var ToUserName = msg.ToUserName;
	var FromUserName = msg.FromUserName;
	var CreateTime = msg.CreateTime;
	var MediaId = msg.MediaId;
	var Title = msg.Title;
	var Description = msg.Description;
	var MusicUrl = msg.MusicUrl;
	var HQMusicUrl = msg.HQMusicUrl;
	var ThumbMediaId = msg.ThumbMediaId;

	var retStr = "<xml>\n\t<ToUserName><![CDATA[" + ToUserName + "]]></ToUserName>\n\t<FromUserName><![CDATA[" + FromUserName + "]]></FromUserName>\n\t<CreateTime>" + CreateTime + "</CreateTime>\n\t<MsgType><![CDATA[music]]></MsgType>\n\t<Music>\n\t<Title><![CDATA[" + Title + "]]></Title>\n\t<Description><![CDATA[" + Description + "]]></Description>\n\t<MusicUrl><![CDATA[" + MusicUrl + "]]></MusicUrl>\n\t<HQMusicUrl><![CDATA[" + HQMusicUrl + "]]></HQMusicUrl>\n\t<ThumbMediaId><![CDATA[" + ThumbMediaId + "]]></ThumbMediaId>\n\t</Music>\n\t</xml>";
	return retStr;
};

exports.default = musicTpl;